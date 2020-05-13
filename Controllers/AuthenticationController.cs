using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {

        public IConfiguration Configuration;
        public AuthenticationController(IConfiguration configuration)
        {
            Configuration = configuration;
        }



        [HttpPost("login")]
        public ActionResult Post(UserCredentials credentials)
        {
            //TODO: encrypt password with SHA1 for increased security
            if (ModelState.IsValid)
            {
                using (euanmortoncoukContext db = new euanmortoncoukContext())
                {
                    var obj = db.Users.Where(a => a.Username.Equals(credentials.Username) && a.Password.Equals(credentials.Password)).FirstOrDefault();
                    if (obj != null)
                    {
                        //user okay, create token
                        string token = GenerateJWT(credentials);
                        TokenResponce responce = new TokenResponce();
                        responce.token = token;
                        responce.message = "Token aquired";


                        return Ok(responce);
                    }
                }
            }

            return Unauthorized();
        }

        public class TokenResponce{
            public string token { get; set; }
            public string message { get; set; }
        }

        public string GenerateJWT(UserCredentials credentials)
        {

        
            //security key
            string security_key = Environment.GetEnvironmentVariable("SECRET_KEY");

            //symmetric security key
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(security_key));

            //signing credentials
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);


            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, credentials.Username),
                //new Claim(JwtRegisteredClaimNames.Email, credentials.EmailAddress),
                //new Claim("DateOfJoing", userInfo.DateOfJoing.ToString("yyyy-MM-dd")),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };  

            //create token
            var token = new JwtSecurityToken(
                issuer: Configuration.GetSection("CustomSettings").GetSection("issuer").Value,
                audience: Configuration.GetSection("CustomSettings").GetSection("audience").Value,

                //claims,
                expires: DateTime.Now.AddDays(14),
                signingCredentials: signingCredentials
                );

            //return token
            //return Ok(new JwtSecurityTokenHandler().WriteToken(token));
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}