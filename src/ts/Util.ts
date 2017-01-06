export const TimeStamp = () => {
  let date:Date = new Date();
  let day:number = date.getDate();
  let month:number = date.getMonth() + 1;
  let year:number = date.getFullYear();
  let hour:number = (date.getHours() > 12) ? date.getHours() - 12 : date.getHours();
  let min:number|string = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes();
  let sec:number|string  = (date.getSeconds() < 10) ? `0${date.getSeconds()}` : date.getSeconds();
  let ampm:string = (date.getHours() >= 12) ? 'pm' : 'am';
  return `${day}/${month}/${year} ${hour}:${min}:${sec} ${ampm}`;
}
