export const commaSeparateNumber = (val) =>{
  if(!val)  return 0;
  while (/(\d+)(\d{3})/.test(val.toString())){
    val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
  }
  return val;
};
