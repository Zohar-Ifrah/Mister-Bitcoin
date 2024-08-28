const { getRandomInt } = require('./util.service')

module.exports = {
    execute
}

const errors = [
    'Developer choked',
    'Too much pressure',
    'High temperature',
    'Server down'
]

function generateError() {
    return errors[getRandomInt(0, 3)]
}

function execute(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if (Math.random() > 0.5) resolve(parseInt(Math.random() * 100))
            else reject(generateError());
        }, 5000)
    }) 
}