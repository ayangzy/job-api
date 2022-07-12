exports.getAlljobs = async(req, res, next) => {
    res.send('Get jobs')
}

exports.createJob = async(req, res, next) => {
    res.send('create new job')
}

exports.getJob = async(req, res, next) => {
    res.send('get a job')
}

exports.updateJob = async(req, res, next) => {
    res.send('update a job')
}

exports.deleteJob = async(req, res, next) => {
    res.send('delete  a job')
}
