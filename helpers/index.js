const validateRut = (rutCompleto) => {
    let rutSinPuntos = rutCompleto.replaceAll(".","");

    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutSinPuntos))
        return false;

    let tmp = rutSinPuntos.split('-');
    let digv = tmp[1]; 
    let rut = tmp[0];

    if(digv == 'K') digv = 'k';
    
    return (dv(rut) == digv);
}

const dv = (t) => {
    let m= 0, s=1;
		for(;t;t=Math.floor(t/10))
			s=(s+t%10*(9-m++%6))%11;
		return s?s-1:'k';
}

module.exports = {
    validateRut
}