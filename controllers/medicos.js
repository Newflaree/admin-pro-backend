const { response, request } = require( 'express' );

const Medico = require( '../models/medico' );

const getMedicos = async( req, res = response ) => {
  const medicos = await Medico.find()
                              .populate( 'usuario', 'nombre img' )
                              .populate( 'hospital', 'nombre img' )

  res.json({
    ok: true,
    medicos
  });
}

const crearMedico = async( req, res = response ) => {
  const uid = req.uid;
  const medico = new Medico({
    usuario: uid,
    ...req.body
  });

  try {
    const medicoDB = await medico.save();

    res.json({
      ok: true,
      medico: medicoDB
    });
  
  } catch ( err ) {
    console.log( err );
    res.status( 500 ).json({
      ok: false, 
      msg: 'Hable con el administrador'
    });
  }

}

const actualizarMedico = async ( req = request, res = response ) => {
  const id = req.params.id;
  const uid = req.uid

  try {
    const medicoDB = await Medico.findById( id );

    if ( !medicoDB ) {
      return res.status( 404 ).json({
        ok: false,
        msg: 'Médico no encontrado por id'
      });
    }

    const cambiosMedico = {
      ...req.body,
      usuario: uid
    }

    const medicoActualizado = await Medico.findByIdAndUpdate( id, cambiosMedico, { new: true } )

    res.json({
      ok: true,
      medico: medicoActualizado
    });

  } catch ( err ) {
    console.log( err );
    res.status( 500 ).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
}

const borrarMedico = async ( req = request, res = response ) => {
  const id = req.params.id;

  try {
    const medicoDB = await Medico.findById( id );

    if ( !medicoDB ) {
      return res.status( 404 ).json({
        ok: false,
        msg: 'Médico no encontrado por id'
      });
    }

    await Medico.findByIdAndDelete( id );

    res.json({
      ok: true,
      msg: 'Médico Borrado'
    });

  } catch ( err ) {
    console.log( err );
    res.status( 500 ).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
}

module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico

}
