import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import moment from 'moment';

export default function Home() {
  var a = moment("2022-03-17", "YYYY-MM-DD"); 
  var b = moment();
  console.log(b);
  console.log(a);
  var diffDays = a.diff(b, 'days');
  return (
    <div className="container">
      <Head>
        <title>Fuerteventura</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <Header title="Fuerteventura" />
        <p>
          Noch { diffDays } Tage bis zum Abflug :-)
        </p>
      </main>
    </div>
  )
}
