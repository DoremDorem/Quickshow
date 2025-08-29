// import axios from "axios";
// import dns from "dns";
// import Movie from "../models/Movie.js";
// import Show from "../models/Show.js";

// // Force IPv4 (fixes ETIMEDOUT issue on some networks)
// dns.setDefaultResultOrder("ipv4first");

// export const getNowPlayingMovies = async (req, res) => {
//   try {
//     const { data } = await axios.get(
//       "https://api.themoviedb.org/3/movie/now_playing",
//       {
//         headers: {
//           Authorization:
//             `Bearer  ${process.env.TMDB_API_KEY}`,
//         },
//         timeout: 10000,
//       }
//     );

//     const movies = data.results; // TMDB always returns in "results"
//     console.log("Now Playing Movies:", movies);

//     res.json({
//       success: true,
//       movies,
//     });
//   } catch (error) {
//     console.error("🔥 FULL TMDB ERROR OBJECT:", JSON.stringify(error, null, 2));

//     if (error.response) {
//       console.error("❌ TMDB ERROR DATA:", error.response.data);
//       console.error("❌ TMDB ERROR STATUS:", error.response.status);
//       console.error("❌ TMDB ERROR HEADERS:", error.response.headers);
//     } else if (error.request) {
//       console.error("📡 NO RESPONSE (request sent but no reply):", error.request);
//     } else {
//       console.error("⚠️ GENERAL ERROR:", error.message);
//     }

//     res.json({
//       success: false,
//       message:
//         error.response?.data?.status_message ||
//         error.message ||
//         "Unknown error",
//     });
//   }
// };


// //api to add new show
// export const addShow=async(req,res)=>{
//   try {
//      const {movieId,showsInput,showPrice}=req.body;
//      let movie=await Movie.findById(movieId)
//      if(!movie){
//       /*fetch movie details from tmdb*/
//       const [movieDetailsResponse,movieCreditsResponse]=await Promise.all([
//         axios.get(`https://api.themoviedb.org/3/movie/${movieId}`,{
//           headers:{Authorization:`Bearer ${process.env.TMDB_API_KEY}`, Accept: "application/json"} }),
//           axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`,{headers:{Authorization:`Bearer ${process.env.TMDB_API_KEY}`, Accept: "application/json"}})
//       ]);


//       const movieApiData=movieDetailsResponse.data;
//       const movieCreditsData=movieCreditsResponse.data
//       const movieDetails={
//          _id:movieId,
//          title:movieApiData.title,
//          overview:movieApiData.overview,
//          poster_path:movieApiData.poster_path,
//          backdrop_path:movieApiData.backdrop_path,
//          genres:movieApiData.genres,
//          casts:movieCreditsData.cast,
//          release_date:movieApiData.release_date,
//          original_language:movieApiData.original_language,
//          tagline:movieApiData.tagline || "",
//          vote_average:movieApiData.vote_average,
//          runtime:movieApiData.runtime
//       }
//       //add movie to database
//       movie=await Movie.create(movieDetails);
//      }

//      const showsToCreate=[];
//      showsInput.forEach(show=>{
//       const showDate=show.date;
//       show.time.forEach((time)=>{
//         const dateTimeString=`${showDate}T${time}`
//         showsToCreate.push({
//           movie:movieId,
//           showDateTime:new Date(dateTimeString),
//           showPrice,
//           occupiedSeats:{}
//         })
//       })
//      });

//      if(showsToCreate.length > 0){
//       await Show.insertMany(showsToCreate)
//      }
//      res.json({success:true,message:'show added succesfully'})

//   } catch (error) {
//     console.error(error)
//     res.json({success:false,message:error.message})
//   }
// }


// //api to get all shows from the database
// export const getShows=async(req,res)=>{
//   try {
//     const shows = await Show.find({showDateTime:{$gte:new Date()}}).populate('movie').sort({showDateTime:1})
//     //console.log("All shows from DB:", shows);
//     //filter unique shows
//     const uniqueShows=new Set(shows.map(show=>show.movie))
//     res.json({success:true,shows:Array.from(uniqueShows)})
//   } catch (error) {
//     console.log(error)
//     res.json({success:false,message:error.message})
//   }
// }

// //api to get a single shows

// export const getShow=async (req,res)=>{
//   try {
//     const {movieId}=req.params;
//     //get all upcoming shows for the movie
//     const shows=await Show.find({movie:movieId,showDateTime:{$gte:new Date()}})
//     const movie=await Movie.findById(movieId)
//     const dateTime={};
//     shows.forEach((show)=>{
//       const data=show.showDateTime.toISOString().split('T')[0];
//       if(!dateTime[data]){
//         dateTime[data]=[];
//       }
//       dateTime[data].push({time:show.showDateTime,showId:show._id})
//     })
//     res.json({success:true,movie,dateTime})
//   } catch (error) {
//     console.log(error)
//     res.json({success:false,message:error.message})
//   }
// }
