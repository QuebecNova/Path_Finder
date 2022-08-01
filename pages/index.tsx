import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Header from '../components/Header'
import Main from '../components/Main'
import { Provider } from 'react-redux'
import { store } from '../store/store'

const Home: NextPage = () => {
  return (
    <Provider store={store}>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
        </Head>
        <Header/>
        <Main/>
      </div>
    </Provider>
  )
}

export default Home
