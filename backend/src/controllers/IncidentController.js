const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;

    const [count] = await connection('incidents').count();
    console.log(count);

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      //the data from the ong that has the id related to the incident
      .limit(5)
      .offset((page - 1) * 5)
      //from page 1, from 0 to the first 5, then the next 5...
      .select(['incidents.*',
      'ongs.name',
      'ongs.email',
      'ongs.whatsapp',
      'ongs.city',
      'ongs.uf'])
      //all data from incidents

    res.header('X-Total-Count', count['count(*)'])

    return res.json(incidents)
  },


  async create(req, res) {
    const { title, description, value } = req.body;

    const ong_id = req.headers.authorization;
    //ong_id -> on req.headers, the ong that is signed has the id on the auth

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    });
     // The object created is part on an array, so the id of the register
     // is auto incremented by the table configuration and is also
     // the first value of the object incident created


    return res.json({id})

  },
  async delete(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)//the id from the incident informed on parms
      .select('ong_id')
      .first(); //only the incident that will be deleted

    if(incident.ong_id !== ong_id) {
      return res.status(401).json({error: 'Operation not permited'})
    }

    await connection('incidents').where('id', id).delete();


    return res.status(204).send();
    //sucess without content
  }
}
