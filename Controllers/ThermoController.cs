using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
//using System.Web.Script.Serialization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class ThermoController : Controller
    {
        // GET: api/<controller>
        [HttpGet]
        //[Route("api/posts/createnewpost")]
        public string Get()
        {
            string thermoText = ReadJsonFile();

            //var json = JsonConvert.DeserializeObject(thermoText);
            return thermoText;
            //return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public string Get(string id)
        {
            if (id == "getTest")
            {
                return "you did a good job";
            }
            else if (id == "getTest2")
            {
                return null; // new string[] { "value2" };
            }
            else
            {
                return "value";
            }
        }

        // POST api/<controller>
        [HttpPost]
        public IActionResult Post([FromBody]UserLogin value)
        {
            //Thermo thermo_data = new Thermo();
            //thermo_data.Temperature = value.temp;
            //thermo_data.TimeOn = value.time;
            //thermo_data.LastUpdated = 0;    //get now time

            string json = JsonConvert.SerializeObject(value);

            //write string to file
            WriteJsonFile(json);

            //return "thankyou";
            return Json(value);
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        //[Conditional("DEBUG")]
        protected void WriteJsonFile(string json)
        {
#if DEBUG
            System.IO.File.WriteAllText(@"T:\Projects\Euan Morton Website\WebApplication1\WebApplication1\thermoData.txt", json);
#else
            System.IO.File.WriteAllText(@"/var/www/WebApplication1/thermoData.txt", json);
#endif

        }
        protected string ReadJsonFile()
        {
#if DEBUG
            return System.IO.File.ReadAllText(@"T:\Projects\Euan Morton Website\WebApplication1\WebApplication1\thermoData.txt");
#else
            return System.IO.File.ReadAllText(@"/var/www/WebApplication1/thermoData.txt");
#endif

        }


        protected void GetThermoDetails()
        {
            
        }

    }
}
