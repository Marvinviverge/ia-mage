import React, { useEffect, useState } from 'react'

import {Card, FormField, Loader} from '../components';
import { getAllPosts } from '../utils/api.service';

const RenderCards = ({data, title}) => {
    if(data?.length > 0){
        return data.map((post) => <Card key={post._id} {...post}/>)
    }
    return (
        <h2 className='mt-5 font-bold text-[#6469ff] text-xl uppercase'>
           {title} 
        </h2>
    )
}

const Home = () => {

    const [loading, setLoading] = useState(false)
    const [allPosts, setAllPosts] = useState([])
    const [searchText, setSearchText] = useState('')

    const[searchedResults, setSearchedResults] = useState([])
    

    useEffect(() => {
      const fetchPosts =  async () => {
        setLoading(true)
        try {
            const response = await getAllPosts()
            if(response){
                setAllPosts(response.data.reverse())
            }
            
        } catch (error) {
            alert(error)
            
        } finally {
            setLoading(false)
        }
      }

      fetchPosts()
    }, [])
    
    useEffect(() => {
        const searchResults = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()))
        setSearchedResults(searchResults)
    
    }, [searchText])

    const handleSearchChange = (e) => {
        setSearchText(e.target.value)
    }

    return (
    <section className='max-w-7x1 mx-auto'>
        <div>
            <h1 className='font-extrabold text-[#222328] text-[32px]'>
                La collection de notre communauté
            </h1>
            <p className='mt-2 text-[#66e75] text[16px] max-w[500px]'>
                Parcourez une collection d'images visuellement époustouflantes générées par l'intelligence artificielle.
            </p>
        </div>
        
        <div className='mt-16'>
        <FormField
          labelName="Rechercher"
          type="text"
          name="text"
          placeholder="Recherchez une image de notre collection"
          value={searchText}
          handleChange={handleSearchChange}
        />
        </div>

        <div className='mt-10'>
            { loading ? (
                <div className='flex justify-center items-center'>
                    <Loader/>
                </div>
            ) : (
                <>
                {searchText && (
                    <h2 className='font-medium text-[#666e75] text-xl mb-3'>Voici les résultats pour la recherche suivante: <span className='text-[#222328]'>{searchText}</span></h2>
                )}
                <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
                    {searchText ? (
                        <RenderCards data={searchedResults} title ="Aucun résultat trouvé."/>
                    ) : (
                        <RenderCards data={allPosts} title ="Aucune image trouvée."/>
                    )}
                </div>
                </>
            )}
        </div>

    </section>
  )
}

export default Home