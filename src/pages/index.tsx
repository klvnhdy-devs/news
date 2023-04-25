import Image from 'next/image'
import Link from 'next/link';
import { useState, useEffect } from 'react';



export default function Home() {

    const [data, setData] = useState([])
    
    async function fetchData ()  {
        const response = await fetch('http://localhost:8000/api/news');

        const data = await response.json();
      
        setData(data.data);
    };
    
    useEffect(() => {
        fetchData()
      }, [])

  return (
    <main>
      <div className="p-2">
          <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 2xl:col-span-9">
                  <div className="grid grid-cols-12 gap-6">

                      <div className="col-span-12 xl:col-span-12 mt-6">
                          <div className="intro-y block sm:flex items-center h-10">
                              <h2 className="text-lg font-medium truncate mr-5">
                                  Goorita News 
                              </h2>
                          </div>
                          <div className='intro-y grid grid-cols-12 gap-4 mt-5'>                          
                            {
                                data.map((datas, key) => 
                                <div className="intro-y col-span-12 md:col-span-4 box">
                                    <div className="h-[320px] before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-black/90 before:to-black/10 image-fit">
                                        <Image
                                            className="rounded-t-md"
                                            fill
                                            src={datas['img']} alt={datas['img']} />
                                        <div className="absolute w-full flex items-center px-5 pt-6 z-10">
                                            <div className="w-10 h-10 flex-none image-fit">
                                            </div>
                                        </div>
                                        <div className="absolute bottom-0 text-white px-5 pb-6 z-10"> <span className="bg-white/20 px-2 py-1 rounded">{datas['publish']}</span> <Link href={{ pathname: datas['slug'], query: { data:datas['id'] }}} className="block font-medium text-xl mt-3">{datas['title']}  </Link></div>
                                    </div>
                                    <div className="p-5 text-slate-600 dark:text-slate-500">{datas['short']}</div>
                                </div>
                                )
                            }
                            </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </main>
  )
}
