import React, { Component } from 'react';
import Moment from 'react-moment';
import moment from 'moment';

export class Calendar extends Component {
    static displayName = Calendar.name;

    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true, month: "init" };
        this.test = "hello";
        var d = new Date();
        this.year = d.getFullYear();
        this.dateToFormat = "2013-01-01T00:00:00.000";

        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        console.log(firstDay);  ///Sun Mar 01 2020 00:00:00 GMT+0000 (Greenwich Mean Time)
        //this.day0 = moment(firstDay, "E");   //1-7
        //console.log("day0:", this.day0);

        const dow = moment(firstDay).day();
        console.log(dow);

        this.dates = {
            week1day1: null, week1day2: null, week1day3: null, week1day4: null, week1day5: null, week1day6: null, week1day7: null,
            week2day1: null, week2day2: null, week2day3: null, week2day4: null, week2day5: null, week2day6: null, week2day7: null,
            week3day1: null, week3day2: null, week3day3: null, week3day4: null, week3day5: null, week3day6: null, week3day7: null,
            week4day1: null, week4day2: null, week4day3: null, week4day4: null, week4day5: null, week4day6: null, week4day7: null,
            week5day1: null, week5day2: null, week5day3: null, week5day4: null, week5day5: null, week5day6: null, week5day7: null,
            week6day1: null, week6day2: null, week6day3: null, week6day4: null, week6day5: null, week6day6: null, week6day7: null,
        };


        console.log(lastDay);

        console.log(moment().day()); // sunday = 0
    }

    componentDidMount() {
        this.populateWeatherData();
    }

    getDays(month) {
        for (i = 0; i < Object.keys(this.dates).length; i++) {
            this.dates[Object.keys(this.dates)[i]] = null;
        }

        var date = new Date();
        var firstDay = new Date(date.getFullYear(), month, 1);
        var lastDay = new Date(date.getFullYear(), month + 1, 0);
        var firstDayOfMonth = moment(firstDay).day();
        var lastDayOfMonth = moment(lastDay).daysInMonth();
        console.log("last day", lastDay);
        console.log("last day", lastDayOfMonth);
        //                <Moment format="YYYY/MM/DD">{this.dateToFormat}</Moment>


        var i;
        var day1 = 0;
        for (i = 0; i < 7; i++) {
            if (firstDayOfMonth == i) {
                //this.dates.week1day1 = i + 1;
                day1 = i;
            }
        }

        var countDay = 1;
        for (i = day1; i < Object.keys(this.dates).length; i++) {
            if (i == 0) {
                i = 7;
                console.log("678");
            }

            this.dates[Object.keys(this.dates)[i - 1]] = countDay;
            if (countDay == lastDayOfMonth) {
                break;
            }
            countDay++;

        }

    }

    changeMonth(month) {
        if (month == 1) {
            this.setState({ month: "January" });
            this.getDays(0);

        }
        else if (month == 2) {
            this.setState({ month: "February" });
            this.getDays(1);
        }
        else if (month == 3) {
            this.setState({ month: "March" });
            this.getDays(2);
        }
        else if (month == 4) {
            this.setState({ month: "April" });
            this.getDays(3);
        }
        else if (month == 5) {
            this.setState({ month: "May" });
            this.getDays(4);
        }
        else if (month == 6) {
            this.setState({ month: "June" });
            this.getDays(5);
        }
        else if (month == 7) {
            this.setState({ month: "July" });
            this.getDays(6);
        }
        else if (month == 8) {
            this.setState({ month: "August" });
            this.getDays(7);
        }
        else if (month == 9) {
            this.setState({ month: "September" });
            this.getDays(8);
        }
        else if (month == 10) {
            this.setState({ month: "October" });
            this.getDays(9);
        }
        else if (month == 11) {
            this.setState({ month: "November" });
            this.getDays(10);
        }
        else if (month == 12) {
            this.setState({ month: "December" });
            this.getDays(11);
        }
    }

    renderCalendarTable(forecasts) {
        //this.state.month;

        return (
            <div>
                <p>{this.year}</p>
                <div style={{display: 'flex', justifycontent: 'space-between', padding: '20px 0px 20px 0px'}}>
                    <button onClick={() => this.prevMonth}>Prev</button>
                    <p>{this.state.month}</p>
                    <button onClick={() => this.nextMonth}>Next</button>
                </div>
                <table className='calendarTable'>
                    <thead>
                        <tr>
                            <th>Mon</th>
                            <th>Tue</th>
                            <th>Wed</th>
                            <th>Thu</th>
                            <th>Fri</th>
                            <th>Sat</th>
                            <th>Sun</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="week1">
                            <td className="day1">{this.dates.week1day1}</td>
                            <td className="day2">{this.dates.week1day2}</td>
                            <td className="day3">{this.dates.week1day3}</td>
                            <td className="day4">{this.dates.week1day4}</td>
                            <td className="day5">{this.dates.week1day5}</td>
                            <td className="day6">{this.dates.week1day6}</td>
                            <td className="day7">{this.dates.week1day7}</td>
                        </tr>
                        <tr className="week2">
                            <td className="day1">{this.dates.week2day1}</td>
                            <td className="day2">{this.dates.week2day2}</td>
                            <td className="day3">{this.dates.week2day3}</td>
                            <td className="day4">{this.dates.week2day4}</td>
                            <td className="day5">{this.dates.week2day5}</td>
                            <td className="day6">{this.dates.week2day6}</td>
                            <td className="day7">{this.dates.week2day7}</td>
                        </tr>
                        <tr className="week3">
                            <td className="day1">{this.dates.week3day1}</td>
                            <td className="day2">{this.dates.week3day2}</td>
                            <td className="day3">{this.dates.week3day3}</td>
                            <td className="day4">{this.dates.week3day4}</td>
                            <td className="day5">{this.dates.week3day5}</td>
                            <td className="day6">{this.dates.week3day6}</td>
                            <td className="day7">{this.dates.week3day7}</td>
                        </tr>
                        <tr className="week4">
                            <td className="day1">{this.dates.week4day1}</td>
                            <td className="day2">{this.dates.week4day2}</td>
                            <td className="day3">{this.dates.week4day3}</td>
                            <td className="day4">{this.dates.week4day4}</td>
                            <td className="day5">{this.dates.week4day5}</td>
                            <td className="day6">{this.dates.week4day6}</td>
                            <td className="day7">{this.dates.week4day7}</td>
                        </tr>
                        <tr className="week5">
                            <td className="day1">{this.dates.week5day1}</td>
                            <td className="day2">{this.dates.week5day2}</td>
                            <td className="day3">{this.dates.week5day3}</td>
                            <td className="day4">{this.dates.week5day4}</td>
                            <td className="day5">{this.dates.week5day5}</td>
                            <td className="day6">{this.dates.week5day6}</td>
                            <td className="day7">{this.dates.week5day7}</td>
                        </tr>
                        <tr className="week5">
                            <td className="day1">{this.dates.week6day1}</td>
                            <td className="day2">{this.dates.week6day2}</td>
                            <td className="day3">{this.dates.week6day3}</td>
                            <td className="day4">{this.dates.week6day4}</td>
                            <td className="day5">{this.dates.week6day5}</td>
                            <td className="day6">{this.dates.week6day6}</td>
                            <td className="day7">{this.dates.week6day7}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
        //<tbody>
                //    forecasts.map(forecast =>
                //        <tr key={forecast.date}>
                //            <td>{forecast.date}</td>
                //            <td>{forecast.temperatureC}</td>
                //            <td>{forecast.temperatureF}</td>
                //            <td>{forecast.summary}</td>
                //        </tr>
                //    )}
                //</tbody>
    }

    render() {
       let contents = this.state.loading
           ? <p><em>Loading...</em></p>
           : this.renderCalendarTable(this.state.forecasts);

        return (
            <div style={{ width: '351px' }}>
                <h1 id="tabelLabel">Calendar</h1>
                <button onClick={() => this.changeMonth(1)}>Jan</button>
                <button onClick={() => this.changeMonth(2)}>Feb</button>
                <button onClick={() => this.changeMonth(3)}>Mar</button>
                <button onClick={() => this.changeMonth(4)}>Apr</button>
                <button onClick={() => this.changeMonth(5)}>May</button>
                <button onClick={() => this.changeMonth(6)}>Jun</button>
                <button onClick={() => this.changeMonth(7)}>Jul</button>
                <button onClick={() => this.changeMonth(8)}>Aug</button>
                <button onClick={() => this.changeMonth(9)}>Sep</button>
                <button onClick={() => this.changeMonth(10)}>Oct</button>
                <button onClick={() => this.changeMonth(11)}>Nov</button>
                <button onClick={() => this.changeMonth(12)}>Dec</button>
                {contents}
            </div>
        );
    }

    async populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        this.setState({ forecasts: data, loading: false });
    }
}
