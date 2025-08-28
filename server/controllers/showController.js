import axios from 'axios';
export const getNowPlayingMovies=async(req,res)=>{
    try {
        const {data}=await axios.get('https://www.omdbapi.com/?i=tt3896198&apikey=7dd196dd');
        const movie=data.response;
        console.log(movie)
        res.json({
            success:true,
            movies:movie
        });
    } catch (error) {
        console.log(error);
         res.json({
            success:false,
            message:error.message
        });
    }
}