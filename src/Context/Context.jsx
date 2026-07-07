import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {


    const [searchParam, setSearchParam] = useState('')
    const [loading, setLoading] = useState(false)
    const [recipeList, setRecipeList] = useState([])
    const [recipeDetailsData, setRecipeDetailsData] = useState(null)
    const [favoritesList, setFavoritesList] = useState([]);
    const navigate = useNavigate()
    function handleAddToFavorite(getCurrentItem) {
        if (!getCurrentItem) return;

        let cpyFavoriteList = [...favoritesList];

        const index = cpyFavoriteList.findIndex(
            (item) => item.id === getCurrentItem.id
        );

        if (index === -1) {
            cpyFavoriteList.push(getCurrentItem);
        } else {
            cpyFavoriteList.splice(index, 1);
        }

        setFavoritesList(cpyFavoriteList);
    }

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const res = await fetch(`https://forkify-api.jonas.io/api/v2/recipes?search=${searchParam}`)
            const data = await res.json();
            if (data?.data?.recipes) {
                setRecipeList(data?.data?.recipes)
                setLoading(false)
                setSearchParam("")
                navigate("/")
            }


            console.log(loading, recipeList)
        }
        catch (e) {
            setLoading(false)
            setSearchParam("")
            console.log(e)
        }
    }
    return <GlobalContext.Provider
        value={{
            handleAddToFavorite,
            loading,
            recipeList,
            searchParam,
            setSearchParam,
            handleSubmit,
            recipeDetailsData,
            setRecipeDetailsData,
            favoritesList
        }}>{children}</GlobalContext.Provider>
}
