import { Console } from "console";
import { renderToHTML } from "next/dist/server/render";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function detailPage() {
    const router = useRouter()
    const [dataApi, setData] = useState([])
    const [dataChild, setChild] = useState([])

    async function fetchData ()  {
        var id =  router.query.data
        const response = await fetch('http://localhost:8000/api/news/'+id);

        const data = await response.json();
        setData(data.data);
        setChild(data.data['child'])
    };

    
    useEffect(() => {
        fetchData()
      }, [])

    function refresh() {
        fetchData()
    }

    return (
        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 xl:col-span-8 intro-y news p-5 mt-6 box">
                <h2 className="intro-y font-medium text-xl sm:text-2xl">
                {dataApi['short']}
                </h2>
                <div className="intro-y text-slate-600 dark:text-slate-500 mt-3 text-xs sm:text-sm"> {dataApi['publish']} <span className="mx-1">•</span> {dataApi['title']} <span className="mx-1">•</span> </div>
                <div className="intro-y mt-6">
                    <div className="news__preview image-fit">
                    <Image
                        className="rounded-t-md"
                        fill
                        src={dataApi['img']} />
                    </div> 
                </div>
                <div className="intro-y text-justify leading-relaxed">
                    <p> { dataApi['desc']} </p>
                </div>
            </div>
            <div className="col-span-12 xl:col-span-4 mt-6">    
                {
                    dataChild.map((child, key) =>   
                    <Link href={{ pathname: child['slug'], query: { data:child['id'] }}} onClick={refresh} >
                        <div className="box px-4 py-4 mb-3 flex items-center zoom-in" >
                            <div className="w-10 h-10 flex-none image-fit rounded-md overflow-hidden">
                            <Image
                                fill
                                    src={child['img']} 
                                    alt={child['img']}
                                    />
                            </div>
                            <div className="ml-4 mr-auto">
                                <div className="font-medium">{child['title']}</div>
                                <div className="text-slate-500 text-xs mt-0.5">{ child['publish'] }</div>
                            </div>
                        </div>
                    </Link>
                )}
            </div>
    </div>
    );
}

export default detailPage; 