import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home({ data, countries }) {


  return (
    <div className={styles.container}>
      <Head>
        <title>Lowest COVID Countries</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


<div className={styles.headersInfo}>
<p>Latest Update On: {data.Date.split('T')[0]}</p>
<p>Countries Currently Less Than 5000 Confirmed Infections: {countries.length}</p>
</div>   

<p className={styles.headersTitle}> Countries with the Lowest Confirmed COVID Infections</p>

<div className={styles.countriesWrapper} >
 {countries.map(country => {
   return (
  
 
 
    <div className={styles.countryItem}>
<Link key={country.ID} href={"/" + country.Slug}><a>

    <img src={"https://flagcdn.com/" + country.CountryCode.toLowerCase() + ".svg"} alt={country.Country}/>
    <p className={styles.countryTitle}>{country.Country} ({country.CountryCode}) </p> 
<div className={styles.countryInfo}>
<span className={styles.textInfo} >Confirmed <span className={styles.numbersInfo}>{country.TotalConfirmed}</span></span>
<span className={styles.textInfo} >Deaths <span className={styles.numbersInfo}>{country.TotalDeaths}</span></span>
<span className={styles.textInfo} >Recovered <span className={styles.numbersInfo}>{country.TotalRecovered}</span></span>
    </div>
</a>
</Link>

    </div>



 
  
  
    
   )
 })}
</div>
      </div>
  )
}


export async function getServerSideProps(context) {
  const res = await fetch('https://api.covid19api.com/summary');
  const data = await res.json();
  const countries = await data.Countries.filter(country => country.TotalConfirmed < 5000);
  countries.sort((a, b) => (a.TotalConfirmed > b.TotalConfirmed) ? 1 :  -1)
  return {
    props: { data, countries }, // will be passed to the page component as props
  }
}
