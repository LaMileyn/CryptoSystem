import React, {useEffect, useState} from 'react';
import {useGetCryptoDetailsQuery} from "../../../services/CryptoApi";
import {useParams} from "react-router-dom";
import {
    DollarCircleOutlined,
    ThunderboltOutlined,
    TrophyOutlined,
    FundOutlined,
    MoneyCollectOutlined,
    StopOutlined,
    ExclamationCircleOutlined,
    NumberOutlined, CheckOutlined
} from "@ant-design/icons";
import millify from "millify";
import s from './CryptoDetail.module.css'
import HTMLReactParser from "html-react-parser";

const CryptoDetail = () => {
    const {cryptoId} = useParams()
    const {data, isFetching} = useGetCryptoDetailsQuery(cryptoId)
    const cryptoDetails = data?.data?.coin;
    // console.log(cryptoDetails)
    const times = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y']
    const stats = [
        {
            title: "Price to USD",
            value: `$ ${cryptoDetails && millify(cryptoDetails.price)}`,
            icon: <DollarCircleOutlined/>
        },
        {title: "Rank", value: cryptoDetails && cryptoDetails.rank, icon: <NumberOutlined/>},
        {
            title: "24h Volume",
            value: `$ ${cryptoDetails && millify(cryptoDetails["24hVolume"])}`,
            icon: <ThunderboltOutlined/>
        },
        {
            title: "Market Cap",
            value: `$ ${cryptoDetails && millify(cryptoDetails.marketCap)}`,
            icon: <DollarCircleOutlined/>
        },
        {
            title: "All-time-high(daily avg.)",
            value: `$ ${cryptoDetails && millify(cryptoDetails.allTimeHigh.price)}`,
            icon: <TrophyOutlined/>
        }
    ]
    const genericStats = [
        {title: "Number of Markets", value: cryptoDetails && cryptoDetails.numberOfMarkets, icon: <FundOutlined/>},
        {
            title: "Number of Exchanges",
            value: cryptoDetails && cryptoDetails.numberOfExchanges,
            icon: <MoneyCollectOutlined/>
        },
        {
            title: "Approved Supply",
            value: cryptoDetails && cryptoDetails.approvedSupply ? <CheckOutlined/> : <StopOutlined/>,
            icon: <ExclamationCircleOutlined/>
        },
        {
            title: "Total Supply",
            value: `$ ${cryptoDetails && millify(cryptoDetails.supply.total)}`,
            icon: <ExclamationCircleOutlined/>
        },
        {
            title: "Circulating supply",
            value: `$ ${cryptoDetails && millify(cryptoDetails.supply.circulating)}`,
            icon: <ExclamationCircleOutlined/>
        }
    ]
    const [time, setTime] = useState()

    return (
        <>
            {
                cryptoDetails && (
                    <>
                        <div className={s.heading}>
                            <h1>{cryptoDetails?.name} price</h1>
                            <p>{cryptoDetails?.name} live price in US dollars. View value statisticks, market cap and
                                supply</p>
                            <select placeholder="Select a time period" value={time}
                                    onChange={(e) => setTime(e.currentTarget.value)}>
                                <option value="7d">7d</option>
                                {
                                    times.map((el, index) => {
                                        return <option key={index} value={el}>{el}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className={s.statistics}>
                            <div className={s.statistics_content}>
                                <div className={s.statistics}>
                                    <div className={s.statistics_headline}>
                                        <h1>{cryptoDetails.name} value statistic</h1>
                                        <p>An overview showing the stats of {cryptoDetails.name}</p>
                                    </div>
                                    {stats?.map(({icon, title, value}) => {
                                        return <div className={s.statistics_item}>
                                            <div className={s.icons_and_text}>
                                                <span className={s.icon}>{icon}</span>
                                                <span className={s.title}>{title}</span>
                                            </div>
                                            <div className={s.value_of_statistic}>{value}</div>
                                        </div>
                                    })}
                                </div>
                                <div className={s.statistics}>
                                    <div className={s.statistics_headline}>
                                        <h1>Other statistic</h1>
                                        <p>An overview showing the stats of {cryptoDetails.name}</p>
                                    </div>
                                    {genericStats?.map(({icon, title, value}) => {
                                        return <div className={s.statistics_item}>
                                            <div className={s.icons_and_text}>
                                                <span className={s.icon}>{icon}</span>
                                                <span className={s.title}>{title}</span>
                                            </div>
                                            <div className={s.value_of_statistic}>{value}</div>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className={s.coin_description}>
                            <h1>What is {cryptoDetails.name}?</h1>
                            {HTMLReactParser(cryptoDetails.description)}
                            <div className={s.links}>
                                <h1>{cryptoDetails.name} links</h1>
                                {cryptoDetails.links.map( link => {
                                    return (
                                        <div className={s.coin_link}>
                                            <span>{link.type}</span>
                                            <a href={link.url}>{link.name}</a>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </>

                )
            }
        </>
    )
}
export default CryptoDetail;