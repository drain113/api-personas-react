import { useEffect, useState, useRef, useMemo } from 'react'
import './App.css'
import { SortBy, type User } from './types.d'
import { UsersList } from './components/UsersList'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const originalUsers = useRef<User[]>([])
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

// Invertir Colores
const toggleColors = () => {
  setShowColors(!showColors)
}

// Ordenar por país
const toggleSortByCountry = () => {
  const newSortingValue =  sorting == SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
  setSorting(newSortingValue)
}

// Eliminar Usuario
const handleDelete = (email: string) => {
  const filteredUsers = users.filter((user) => user.email !== email)
  setUsers(filteredUsers)
}


// Resetear lista
const handleReset = () => {
  setUsers(originalUsers.current)
}


useEffect(() => {
  fetch('https://randomuser.me/api?results=100')
    .then(async res => await res.json())
    .then(res => {
      setUsers(res.results)
      originalUsers.current = res.results
    })
    .catch(err => {
      console.error(err)
    })
  }, [])


  const filteredUsers = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0
    ? users.filter(user => {
    return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
  })
  : users
  }, [users, filterCountry]) 


  const sortedUsers = useMemo(() => {
    console.log('calculate sortedUsers')

    if (sorting === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredUsers, sorting])


  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  return (
    <div>
      <h1>Ficha técnica</h1>

      <header>

        <button onClick={toggleColors}>
          Colorear Filas
        </button>
        <button onClick={toggleSortByCountry}>
          {sorting == SortBy.COUNTRY ? 'No ordenar por país' : 'Ordenar por país'}
        </button>
        <button onClick={handleReset}>
          Reiniciar lista
        </button>

        <input placeholder='Filtrar por país' onChange={(e) => {
          setFilterCountry(e.target.value)
        }}>
        </input>
      </header>

      <main>
      <UsersList
      showColors={showColors} 
      users={sortedUsers}
      deleteUser={handleDelete}
      resetList={handleReset}
      changeShorting={handleChangeSort} 
      />
      </main>

    </div>
  )
}

export default App
