import { useContext } from "react";
import RecipeItem from "../../Components/RecipeItem/RecipeItem";
import { GlobalContext } from "../../Context/Context";

export default function Favorite() {
    const { favoritesList, loading } = useContext(GlobalContext);

    if (loading) {
        return <div>Loading... Please wait!</div>;
    }

    return (
        <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
            {favoritesList?.length > 0 ? (
                favoritesList.map((item) => (
                    <RecipeItem
                        key={item.id}
                        item={item}
                    />
                ))
            ) : (
                <div>
                    <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
                        Nothing is Added in Favorites
                    </p>
                </div>
            )}
        </div>
    );
}