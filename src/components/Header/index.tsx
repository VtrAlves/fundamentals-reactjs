import React from 'react'

import { Link } from 'react-router-dom'

import { Container } from './styles'

import Logo from '../../assets/logo.svg'

interface HeaderProps {
	size?: 'small' | 'large'
	currentPath: string
}

const Header: React.FC<HeaderProps> = ({
	size = 'large',
	currentPath
}: HeaderProps) => {
	return (
		<Container size={size}>
			<header>
				<img src={Logo} alt="GoFinances" />
				<nav>
					<Link
						to="/"
						className={currentPath === '/' ? 'active' : ''}
					>
						Listagem
					</Link>
					<Link
						to="/import"
						className={currentPath === '/import' ? 'active' : ''}
					>
						Importar
					</Link>
				</nav>
			</header>
		</Container>
	)
}

export default Header
