import { Link, Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
export default function Welcome(props) {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [today, setToday] = useState([]);
    const [dayIndex, setDayindex] = useState(5);
   const [nextSevenDates, setNextSevenDates] = useState([]);
    function changeIcon(item) {
        if (item == "Thunderstorm") {
            return "./assets/weather/thunder.svg";
        } else if (item == "Drizzle") {
            return "./assets/weather/drizzle.svg";
        } else if (item == "Rain") {
            return "./assets/weather/rain.svg";
        } else if (item == "Snow") {
            return "./assets/weather/snow.svg";
        } else if (item == "Mist") {
            return "./assets/weather/fog.svg";
        } else if (item == "Smoke") {
            return "./assets/weather/fog.svg";
        } else if (item == "Haze") {
            return "./assets/weather/fog.svg";
        } else if (item == "Dust") {
            return "./assets/weather/fog.svg";
        } else if (item == "Fog") {
            return "./assets/weather/fog.svg";
        } else if (item == "Sand") {
            return "./assets/weather/fog.svg";
        } else if (item == "Ash") {
            return "./assets/weather/fog.svg";
        } else if (item == "Squall") {
            return "./assets/weather/fog.svg";
        } else if (item == "Tornado") {
            return "./assets/weather/tornado.svg";
        } else if (item == "Clear") {
            return "./assets/weather/clear.svg";
        } else if (item == "Clouds") {
           
            return "./assets/weather/cloud.svg";

        }
    }

    const handleClick = (index) => {
        
        setDayindex(index);
    };

    useEffect(() => {
        const getApiData = async (lat, lon) => {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=9ae17905c4a2dc496b5467a1cf7d6648`
            ).then((response) => response.json());

            setPosts(response);
        };
        const getCurrentData = async (lat, lon) => {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=9ae17905c4a2dc496b5467a1cf7d6648`
            ).then((response) => response.json());

            setCurrentData(response);
        };
        function formatDate() {
            var d = new Date(),
                month = "" + (d.getMonth() + 1),
                day = "" + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = "0" + month;
            if (day.length < 2) day = "0" + day;

            setToday([year, month, day].join("-"));
        }
        formatDate();
        getCurrentData(-5.0, 120.0);
        getApiData(-5.0, 120.0);
        const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        let date = new Date();
        let nextSevenDates = [];

        for (let i = 0; i < 6; i++) {
            let formattedDate;
            if (i == 0) {
                formattedDate = new Date(date.setDate(date.getDate() + i));
            } else {
                formattedDate = new Date(date.setDate(date.getDate() + 1));
            }
            let dayName = days[formattedDate.getDay()];
            let monthName = months[formattedDate.getMonth()];
            nextSevenDates.push({
                date: formattedDate.toISOString().slice(0, 10),
                day: dayName,
                month: monthName,
                dayIndex: i,
            });
        }
        setNextSevenDates(nextSevenDates);
    }, []);


    if (loading) return <h1>Loading data</h1>;
    else if (posts)
        return (
            <>
                <Head title="Weather" />
                <div className="flex flex-col items-center justify-center w-screen min-h-screen text-gray-700 p-10 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 ">
                    {posts.city && (
                        <Render
                            data={posts}
                            current={currentData}
                            days={nextSevenDates}
                            dayIndex={dayIndex}
                        />
                    )}
                </div>
            </>
        );

    function Render({ data, current, days, dayIndex }) {
    

        return (
            <>
                <div className="w-full max-w-screen-sm bg-white p-10 rounded-xl ring-8 ring-white ring-opacity-40">
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-6xl font-bold">
                                {current.main.temp}°C
                            </span>
                            <span className="font-semibold mt-1 text-gray-500">
                                {data.city.name}
                            </span>
                            <span className="font-semibold text-xl mt-1 text-gray-800">
                                {days[0].date}
                            </span>
                        </div>
                        <div>
                            <img
                                className="h-44 w-44"
                                src={changeIcon(current.weather[0].main)}
                            />

                            <span className="font-semibold mt-1 text-gray-500">
                                Feels Like{" "}
                                <span className="font-bold">
                                    {current.main.feels_like}°C
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-between mt-12">
                        {days.map((list, index) => {
                   
                            return (
                                <button
                                    key={index}
                                    className="flex flex-col items-center hover:bg-gray-100 p-3 rounded border hover:border-black"
                                    onClick={() => handleClick(list.dayIndex)}
                                >
                                    <span className="text-center font-semibold text-2xl">
                                        {list.date.substr(-2)}
                                    </span>
                                    <span className="font-semibold text-sm">
                                        {list.day}
                                    </span>
                                    <span className="text-xs font-semibold text-gray-400">
                                        {list.month}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className="flex flex-col space-y-6 w-full max-w-screen-sm bg-white p-10 mt-10 rounded-xl ring-8 ring-white ring-opacity-40">
                    <span className="font-semibold text-center text-lg mt-1 text-gray-800 underline">
                        {days[dayIndex].date}
                    </span>
                    {data.list.map((item, index) => {
                        if (item.dt_txt.substr(0, 10) == days[dayIndex].date) {
                            return (
                                <>
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-lg w-1/4">
                                            {item.dt_txt.substr(11, 15)}
                                        </span>
                                        <div className="flex items-center justify-end w-1/4 pr-10">
                                            <span className="font-semibold">
                                                {item.main.humidity}%
                                            </span>
                                            <svg
                                                className="w-6 h-6 fill-current ml-1"
                                                viewBox="0 0 16 20"
                                                version="1.1"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g transform="matrix(1,0,0,1,-4,-2)">
                                                    <path
                                                        d="M17.66,8L12.71,3.06C12.32,2.67 11.69,2.67 11.3,3.06L6.34,8C4.78,9.56 4,11.64 4,13.64C4,15.64 4.78,17.75 6.34,19.31C7.9,20.87 9.95,21.66 12,21.66C14.05,21.66 16.1,20.87 17.66,19.31C19.22,17.75 20,15.64 20,13.64C20,11.64 19.22,9.56 17.66,8ZM6,14C6.01,12 6.62,10.73 7.76,9.6L12,5.27L16.24,9.65C17.38,10.77 17.99,12 18,14C18.016,17.296 14.96,19.809 12,19.74C9.069,19.672 5.982,17.655 6,14Z"
                                                        style={{
                                                            fillRule: "nonzero",
                                                        }}
                                                    />
                                                </g>
                                            </svg>
                                        </div>
                                        {item.weather.map((val,index) => {
                                            return (
                                                <img key={index}
                                                    className="h-8 w-8"
                                                    src={changeIcon(val.main)}
                                                />
                                            );
                                        })}

                                        <span className="font-semibold text-lg w-1/4 text-right">
                                            {item.main.temp_min}° /{" "}
                                            {item.main.temp_max}°
                                        </span>
                                    </div>
                                </>
                            );
                        }
                        return null;
                    })}
                </div>
            </>
        );
    }
}
