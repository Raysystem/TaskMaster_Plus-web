import Link from 'next/link'
import useAppData from '../../data/hook/useAppData'
import Image from 'next/image'

interface AvatarUsuarioProps {
    className?: string
}

export default function AvatarUsuario(props: AvatarUsuarioProps) {
    const ctx = useAppData()
    return (
        <div>
            <Image height={50} width={50}
                src={ctx?.user.img ?? '/avatar.svg'}
                alt="Avatar do Usuário"
                className={`
                    h-10 w-10 rounded-full
                    ${props.className}
                `}
            />
            <div className='justify-items-center text-black pr-2 pl-2'>
                {ctx.user.name}
            </div>
        </div>
    )
}