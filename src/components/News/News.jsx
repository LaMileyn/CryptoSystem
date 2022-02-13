import React, {useState} from 'react';
import s from './New.module.css'
import {useGetCryptosNewsQuery} from "../../services/CryptoNewsApi";
import moment from "moment";
import {Select} from 'antd';
import {useGetCryptosQuery} from "../../services/CryptoApi";
import {NavLink} from "react-router-dom";

const {Option} = Select

const News = ({symplifyed}) => {
    const {Option} = Select
    const baseImage = "https://toppng.com/uploads/preview/icon-enterprise-company-name-ico-11563503074ctayiq52av.png"
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
    const {data} = useGetCryptosQuery(100);
    const {data: cryptoNews, isFetching} = useGetCryptosNewsQuery({
        newsCategory,
        count: symplifyed ? 6 : 12
    })
    if (isFetching) return "Loading..."
    console.log(cryptoNews)
    return (
        <>
            {!symplifyed && (
                <select placeholder="Select a Cripto" value={newsCategory}
                        onChange={(e) => setNewsCategory(e.currentTarget.value)}>
                    <option value="Cryptocurrency">Cryptocurrency</option>
                    {
                        data?.data?.coins.map((el, index) => {
                            return <option key={index} value={el.name}>{el.name}</option>
                        })
                    }
                </select>
            )}
            <div className={s.grid_items_news}>
                {
                    cryptoNews?.value?.map((el, index) => {
                        return (
                            <a href ={el.url}>
                                <div className={s.news_item} key={index}>
                                    <div className={s.news_item_title}>
                                        <div className={s.news_title_text}>
                                            <h3>{el.name}</h3>
                                        </div>
                                        <div className={s.news_title_image}>
                                            <img src={el?.image?.thumbnail?.contentUrl} alt=""/>
                                        </div>
                                    </div>
                                    <div className={s.description_news}>
                                        <p>{el.description > 100
                                            ? `${el.description.substring(0, 100)}...`
                                            : el.description
                                        }</p>
                                    </div>
                                    <div className={s.provider_news}>
                                        <div className={s.provider_and_time}>
                                            <div className={s.provider_name_img}>
                                                <img
                                                    src={el.provider[0]?.image?.thumbnail?.contentUrl ? el.provider[0]?.image?.thumbnail?.contentUrl : baseImage}
                                                    alt=""/>
                                                <span>{el?.provider[0]?.name}</span>
                                            </div>
                                            <span>{moment(el.datePublished).startOf('ss').fromNow()}</span>
                                        </div>
                                    </div>
                                </div>
                            </a>)
                    })
                }

            </div>
        </>
    )
}
export default News;