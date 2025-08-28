const timeFormate=(minutes)=>{
    const hours=Math.floor(minutes/60);
    const minutesReminders=minutes%60;
    return `${hours}h ${minutesReminders}m`
}
export default timeFormate;