import {Cryptocurrencies} from "../../components/Cryptocurrencies";
import s from './home.module.css'
import {useGetCryptosQuery} from "../../services/CryptoApi";
import millify from "millify";
import {NavLink} from "react-router-dom";
import {News} from "../../components/News";

const Home = () => {
    const {data, isFetching} = useGetCryptosQuery(10);
    const globalStats = data?.data?.stats
    if (isFetching) return "Loading....."
    return (
        <>
            <h1 className={s.title_main}>Global Crypto Stats</h1>
            <div className={s.StatsTypes}>
                <ul>
                    <li>
                        <div className={s.title_type}>Total Cryptocurrencies</div>
                        <span className={s.amount_type}>{globalStats.total}</span></li>
                    <li>
                        <div className={s.title_type}>Total Exchanges</div>
                        <span className={s.amount_type}>{millify(globalStats.totalExchanges)}</span></li>
                    <li>
                        <div className={s.title_type}>Total Market Cap</div>
                        <span className={s.amount_type}>{millify(globalStats.totalMarketCap)}</span></li>
                    <li>
                        <div className={s.title_type}>Total Markets</div>
                        <span className={s.amount_type}>{millify(globalStats.totalMarkets)}</span></li>
                    <li>
                        <div className={s.title_type}>Total 24h Volume</div>
                        <span className={s.amount_type}>{millify(globalStats.total24hVolume)}</span></li>
                </ul>
            </div>
            <section className={s.new_section}>
                <div className={s.section_top_text}>
                <h1 className={s.title_main}>Top 10 Cryptocurrencies in the world</h1>
                <NavLink className={s.link_to_all} to='/cryptocurrencies'>See all</NavLink>
                </div>
                <Cryptocurrencies symplifyed />
            </section>
            <section className={s.new_section}>
                <div className={s.section_top_text}>
                    <h1 className={s.title_main}>Lates Crypto News</h1>
                    <NavLink className={s.link_to_all} to='/cryptoNews'>See all</NavLink>
                </div>
                <News symplifyed />
            </section>
        </>
    )
}
export default Home;