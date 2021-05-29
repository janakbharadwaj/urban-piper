import React from 'react';
import './index.css';
import axios from "axios"

let backgrounImages=[
  "https://lumiere-a.akamaihd.net/v1/images/star-wars-the-rise-of-skywalker-theatrical-poster-1000_ebc74357.jpeg?region=0%2C0%2C891%2C1372",
  "https://pbs.twimg.com/media/ECwE_nmU0AAQBMs.jpg",
  "https://media.contentapi.ea.com/content/dam/gin/images/2017/01/star-wars-battlefront-key-art.jpg.adapt.crop3x5.533p.jpg",
  "https://i.redd.it/pmdvsolq9d341.jpg",
  "https://www.wallpapertip.com/wmimgs/249-2493510_star-wars-phone-wallpaper.jpg",
  "https://i.imgur.com/WI1vHvm.jpg",
]

function Person() {
  const [name,setName] = React.useState('')
  const [birthYear,setBirthYear] = React.useState('')
  const [height,setHeight] = React.useState('')
  const [mass,setMass] = React.useState('')
  const [hairColor,setHairColor] = React.useState('')
  const [skinColor,setSkinColor] = React.useState('')
  const [eyeColor,setEyeColor] = React.useState('')
  const [gender,setGender] = React.useState('')

  const randomImage = backgrounImages[Math.floor(Math.random() * backgrounImages.length)];
  
  React.useEffect(()=>{
    let url = localStorage.getItem("starwars_url")
    let parsedUrl = JSON.parse(url)
    getData(parsedUrl)
  },[])

  const getData=(directUrl)=>{
    axios.get(directUrl)
    .then((res)=>{
      setName(res.data.name)
      setBirthYear(res.data.birth_year)
      setHeight(res.data.height)
      setMass(res.data.mass)
      setHairColor(res.data.hair_color)
      setSkinColor(res.data.skin_color)
      setEyeColor(res.data.eye_color)
      setGender(res.data.gender)
    })
  }

  
  return (
    <div className='indivPerson_div'>
      <div className='indivPerson_imgDiv'>
        <img 
          src={randomImage}
          alt='starWarsImg'
        />
      </div>
      <div className='indivPerson_personDiv'>
        {name && <h1>{name}</h1>}
        {birthYear && <h2>Birth : {birthYear}</h2>}
        {gender && <h2>Gender : {gender}</h2>}
        {height && <p>Height : {height}</p>}
        {mass && <p>Mass : {mass}</p>}
        {hairColor && <p>Hair : {hairColor}</p>}
        {eyeColor && <p>Eyes : {eyeColor}</p>}
        {skinColor && <p>Skin : {skinColor}</p>}
      </div>
      <div className='indivPerson_imgDiv'>
        <img 
          src={randomImage}
          alt='starWarsImg'
        />
      </div>
    </div>
  );
}

export default Person;
