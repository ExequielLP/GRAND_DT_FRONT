import React, { useEffect, useState, useMemo } from 'react'
import { useUserStore } from '../../hooks/useUserStrore'
import './css/ListUserAdmin.css'

const getRoleBadgeClass = (role) => {
  const r = role?.toString().toUpperCase()
  if (r?.includes('ADMIN')) return 'admin'
  if (r?.includes('USER'))  return 'user'
  return 'default'
}

const ListUserAdmin = () => {
  const users      = useUserStore(state => state.users)
  const loading    = useUserStore(state => state.loading)
  const error      = useUserStore(state => state.error)
  const fetchUsers = useUserStore(state => state.fetchUsers)

  const [search, setSearch]     = useState('')
  const [sortOrder, setSortOrder] = useState(null) // null | 'asc' | 'desc'

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const filtered = useMemo(() => {
    if (!Array.isArray(users)) return []

    let result = [...users]

    // filtro por nombre o equipo
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter(u =>
        `${u.firstName} ${u.lastName}`.toLowerCase().includes(q) ||
        (u.nameTeam ?? '').toLowerCase().includes(q)
      )
    }

    // orden por puntos
    if (sortOrder === 'asc')  result.sort((a, b) => (a.puntosAcumulados ?? 0) - (b.puntosAcumulados ?? 0))
    if (sortOrder === 'desc') result.sort((a, b) => (b.puntosAcumulados ?? 0) - (a.puntosAcumulados ?? 0))

    return result
  }, [users, search, sortOrder])

  const toggleSort = (order) => setSortOrder(prev => prev === order ? null : order)

  const renderBody = () => {
    if (loading) return (
      <tr><td colSpan={5}>
        <div className="table-state">
          <span className="state-icon">⏳</span>
          Cargando usuarios...
        </div>
      </td></tr>
    )
    if (error) return (
      <tr><td colSpan={5}>
        <div className="table-state error">
          <span className="state-icon">⚠️</span>
          {error}
        </div>
      </td></tr>
    )
    if (filtered.length === 0) return (
      <tr><td colSpan={5}>
        <div className="table-state">
          <span className="state-icon">🔍</span>
          {search ? 'Sin resultados para esa búsqueda.' : 'No hay usuarios registrados.'}
        </div>
      </td></tr>
    )

    return filtered.map((user, i) => (
      <tr key={user.id ?? i}>
        <td data-label="Nombre">
          <span className="user-name">{user.firstName}</span>{' '}
          <span className="user-lastname">{user.lastName}</span>
        </td>
        <td data-label="Equipo">
          <span className="team-name">{user.nameTeam ?? '—'}</span>
        </td>
        <td data-label="Email">
          <span className="user-email">{user.email}</span>
        </td>
        <td data-label="Rol">
          <div className="roles-cell">
            {Array.isArray(user.roles) && user.roles.length > 0
              ? user.roles.map((role, j) => (
                  <span key={j} className={`role-badge ${getRoleBadgeClass(role)}`}>
                    {role?.toString().replace(/[\[\]]/g, '').trim()}
                  </span>
                ))
              : <span className="role-badge default">—</span>
            }
          </div>
        </td>
        <td data-label="Pts. acumulados">
          <span className="points-value">
            {user.puntosAcumulados != null ? user.puntosAcumulados : '—'}
          </span>
        </td>
      </tr>
    ))
  }

  return (
    <div className="list-users-page">
      <div className="list-users-container">

        <div className="list-users-header">
          <span className="admin-badge">Gestión de usuarios</span>
          <h1>Usuarios registrados</h1>
          <p>Listado completo de usuarios y sus roles en el torneo.</p>
        </div>

        {/* ── barra de controles ── */}
        <div className="table-controls">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              type="text"
              placeholder="Buscar por nombre o equipo..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="search-clear" onClick={() => setSearch('')}>✕</button>
            )}
          </div>

          <div className="sort-buttons">
            <span className="sort-label">Ordenar pts:</span>
            <button
              className={`sort-btn ${sortOrder === 'asc' ? 'active' : ''}`}
              onClick={() => toggleSort('asc')}
              title="Menor a mayor"
            >
              ↑ Menor
            </button>
            <button
              className={`sort-btn ${sortOrder === 'desc' ? 'active' : ''}`}
              onClick={() => toggleSort('desc')}
              title="Mayor a menor"
            >
              ↓ Mayor
            </button>
          </div>
        </div>

        <div className="table-card">
          <table className="users-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Equipo</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Pts. acumulados</th>
              </tr>
            </thead>
            <tbody>
              {renderBody()}
            </tbody>
          </table>

          {Array.isArray(users) && users.length > 0 && (
            <div className="users-count">
              {filtered.length === users.length
                ? `${users.length} usuario${users.length !== 1 ? 's' : ''} en total`
                : `${filtered.length} de ${users.length} usuarios`
              }
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default ListUserAdmin
