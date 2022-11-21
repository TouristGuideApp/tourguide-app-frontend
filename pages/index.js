import {useState} from "react";
import axios from "axios";
import SearchBarComp from "../components/searchBar";
import dynamic from "next/dynamic";
import CityInfoHeader from "../components/cityInfoHeader";
import {CircularProgress} from "@mui/material";

export default function Home() {
    const [cityProp, setCityProp] = useState("")  //City Name From Search Bar
    const [cityData, setCityData] = useState([])
    const [displayLoading, setDisplayLoading] = useState(false)
    const [displayImages, setDisplayImages] = useState(false)
    const [displayMap, setDisplayMap] = useState(false)

    function getAllImages(titleToSearch) {
        let APICallString = "http://localhost:8080/api/v1/images/getByTitle/" + titleToSearch;
        axios.get(APICallString).then(function (response) {
            const data = response.data
            setCityData(data)
            setDisplayLoading(false)
            setDisplayImages(true)
            setDisplayMap(true)
        }).catch(function (error) {
            console.log(error)
        })
    }

    function submitForm(word){
        setDisplayLoading(true)
        getAllImages(word)
    }

    const AllSchoolsMap = dynamic(
        () => import('../components/AllSchoolsMap'), // replace '@components/map' with your component's location
        { ssr: false } // This line is important. It's what prevents server-side render
    )

    return (

        <div className="Home">
            <div className="search-container">
                <div className="searchbar">
                    <SearchBarComp changeWord={word => setCityProp(word)} submitForm={submitForm}/>
                </div>
            </div>
            {displayMap &&
                <>
                    <div className="map-container">
                        <AllSchoolsMap
                            mapInfo={cityData}
                        />
                    </div>
                </>
            }
            {displayImages &&
                <>
                    <div className="city-container">
                        <CityInfoHeader cityProp={cityProp} cityData={cityData}/>
                    </div>
                </>
            }
            {displayLoading &&
                <>
                    <div style={{textAlign: 'center'}}>
                        <span>Loading...</span>
                        <br/>
                        <br/>
                        <CircularProgress />
                    </div>
                </>
            }
        </div>
    );
}