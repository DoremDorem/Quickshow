export const dateFormat=(date)=>{
    return new Date(date).toLocaleString('en-US',{
        weekday:'short',
        mont:'long',
        day:'numeric',
        hour:'numeric',
        minute:'numeric'
    });
}