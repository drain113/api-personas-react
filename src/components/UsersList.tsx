import { SortBy, type User } from '../types.d'

interface Props {
    changeShorting: (sort: SortBy) => void
    resetList: (email: string) => void
    deleteUser: (email: string) => void
    showColors: boolean
    users: User[]
}

export function UsersList ({ deleteUser, users, showColors, changeShorting }: Props) {
    return (
        <table width='100%'>

            <thead>
                <tr>
                   <th>Foto</th> 
                   <th className='pointer' onClick={() => changeShorting(SortBy.NAME)}>Nombre</th> 
                   <th className='pointer' onClick={() => changeShorting(SortBy.LAST)}>Apellido</th> 
                   <th className='pointer' onClick={() => changeShorting(SortBy.COUNTRY)}>País</th>
                   <th>Acciones</th>  
                </tr>
            </thead>

            <tbody>
                {
                    users.map((user, index) => {
                        const backgroundColor = index % 2 == 0 ? '#E6EBEC' : '#C7CBCB'
                        const color = showColors ? backgroundColor : 'transparent'

                        return (
                            <tr key={user.email} style={{ backgroundColor: color }}>
                                <td>
                                    <img src={user.picture.thumbnail}></img>
                                </td>
                                <td>
                                    {user.name.first}
                                </td>
                                <td>
                                    {user.name.last}
                                </td>
                                <td>
                                    {user.location.country}
                                </td>
                                <td>
                                    <button onClick={() =>{
                                        deleteUser(user.email)
                                    }}>Borrar</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>


        </table>
    )
}
