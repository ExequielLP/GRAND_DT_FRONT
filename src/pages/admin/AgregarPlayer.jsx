import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import usePlayersStore from '../../hooks/usePlayerStroe'
import './css/AgregarPlayer.css'

const POSITIONS = [
  { value: 'PRIMERA_LINEA',  label: 'Primera línea'  },
  { value: 'SEGUNDA_LINEA',  label: 'Segunda línea'  },
  { value: 'TERCERA_LINEA',  label: 'Tercera línea'  },
  { value: 'MEDIOSCRUM',     label: 'Medioscrum'      },
  { value: 'APERTURA',       label: 'Apertura'        },
  { value: 'WING',           label: 'Wing'            },
  { value: 'CENTRO',         label: 'Centro'          },
  { value: 'FULLBACK',       label: 'Fullback'        },
]

const initialForm = {
  firstName: '',
  lastName:  '',
  position:  '',
  puntaje:   0,
}

const AgregarPlayer = () => {
  const navigate      = useNavigate()
  const createPlayer  = usePlayersStore(state => state.createPlayer)

  const [form,     setForm]     = useState(initialForm)
  const [loading,  setLoading]  = useState(false)
  const [feedback, setFeedback] = useState(null) // { type: 'success'|'error', msg }
  const [errors,   setErrors]   = useState({})

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'El nombre es requerido.'
    if (!form.lastName.trim())  e.lastName  = 'El apellido es requerido.'
    if (!form.position)         e.position  = 'Seleccioná una posición.'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) { setErrors(e2); return }

    setLoading(true)
    setFeedback(null)
    try {
      await createPlayer({
        firstName: form.firstName.trim(),
        lastName:  form.lastName.trim(),
        position:  form.position,
        puntaje:   Number(form.puntaje),
      })
      setFeedback({ type: 'success', msg: '✓ Jugador agregado correctamente.' })
      setForm(initialForm)
    } catch (err) {
      setFeedback({ type: 'error', msg: err.message || 'Error al agregar el jugador.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="agregar-player-page">
      <div className="agregar-player-container">

        <div className="agregar-player-header">
          <span className="admin-badge">Gestión de jugadores</span>
          <h1>Agregar jugador</h1>
          <p>Completá los datos para incorporar un nuevo jugador al torneo.</p>
        </div>

        {feedback && (
          <div className={`form-feedback ${feedback.type}`}>
            {feedback.msg}
          </div>
        )}

        <form className="form-card" onSubmit={handleSubmit} noValidate>

          <div className="form-row">
            <div className="form-field">
              <label className="form-label">Nombre</label>
              <input
                className="form-input"
                type="text"
                name="firstName"
                placeholder="Ej: Juan"
                value={form.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <span className="form-error">{errors.firstName}</span>}
            </div>

            <div className="form-field">
              <label className="form-label">Apellido</label>
              <input
                className="form-input"
                type="text"
                name="lastName"
                placeholder="Ej: Pérez"
                value={form.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <span className="form-error">{errors.lastName}</span>}
            </div>
          </div>

          <div className="form-field">
            <label className="form-label">Posición</label>
            <select
              className="form-select"
              name="position"
              value={form.position}
              onChange={handleChange}
            >
              <option value="">Seleccioná una posición…</option>
              {POSITIONS.map(p => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
            {errors.position && <span className="form-error">{errors.position}</span>}
          </div>

          <div className="form-field">
            <label className="form-label">Puntaje inicial</label>
            <input
              className="form-input"
              type="number"
              name="puntaje"
              min="0"
              value={form.puntaje}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Guardando…' : 'AGREGAR JUGADOR'}
            </button>
            <button type="button" className="btn-cancel" onClick={() => navigate('/admin')}>
              Cancelar
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default AgregarPlayer
