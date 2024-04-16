import Link from 'next/link'
import useAppData from '../../data/hook/useAppData'

interface AvatarUsuarioProps {
    className?: string
}

export default function AvatarUsuario(props: AvatarUsuarioProps) {
    const ctx = useAppData()
    return (
        <Link href="">
            <img
                src={ctx?.user.img ?? '/avatar.svg'}
                alt="Avatar do Usuário"
                className={`
                    h-10 w-10 rounded-full
                    ${props.className}
                `}
            />
            <div className='justify-items-center pr-2 pl-2'>
                {ctx.user.name}
            </div>
        </Link>
    )
}