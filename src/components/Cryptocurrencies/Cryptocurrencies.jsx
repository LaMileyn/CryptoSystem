import React, {useEffect, useState} from 'react';
import s from './Cryptocurrencies.module.css'
import millify from "millify";
import {useGetCryptosQuery} from "../../services/CryptoApi";
import {SearchOutlined} from '@ant-design/icons'
import {NavLink} from "react-router-dom";

const Cryptocurrencies = ({symplifyed}) => {
    const count = symplifyed ? 10 : 100
    const {data: cryptosList, isFetching} = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState(cryptosList?.data?.coins)
    const [value, setValue] = useState('')
    const [found, setFound] = useState(true)

    useEffect(() => {
        const filtered = cryptosList?.data?.coins.filter(el => el.name.toLowerCase().includes(value.toLowerCase()))
        setCryptos(filtered)
        if (filtered) {
            if (filtered.length === 0) {
                setFound(false)
            } else {
                setFound(true)
            }
        }
    }, [cryptosList, value])
    // console.log(cryptos)
    if (isFetching) return "Loading......"
    return (
        <>
            {!symplifyed && (
                <div className={s.search_input}>
                    <input placeholder="Your coin here..." type="text" value={value}
                           onChange={(e) => setValue(e.currentTarget.value)}/>
                    <SearchOutlined className={s.search_icon}/>
                </div>

            )}
            {
                !found &&
                <div className={s.contaner_not_found}>
                    <h2>По запросу {`#${value}`} ничего не найдено...</h2>
                </div>
            }
            <div className={s.cryptos_items_grid_container}>
                {
                    cryptos?.map((el, index) => {
                        return (<div className={s.cryptos_item} key={index}>
                                <NavLink className={s.link_to_curr} to={`/cryptocurrencies/${el.uuid}`}></NavLink>
                                <div className={s.cryptos_item_up_part}>
                                    <h3 className={s.title_cryptos_item}>{el.rank}. {el.name}</h3>
                                    <img src={el.iconUrl} alt=""/>
                                </div>
                                <div className={s.cryptos_item_down_part}>
                                    <p>Price: <span>{millify(el.price)}$</span></p>
                                    <p>Market Cap: <span>{millify(el.marketCap)}</span></p>
                                    <p>Daily Change: <span>{millify(el.change)}%</span></p>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </>
    )
}

export default Cryptocurrencies;