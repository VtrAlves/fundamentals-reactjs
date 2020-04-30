import React, { useState, useEffect } from 'react'
import { parseISO } from 'date-fns'

import income from '../../assets/income.svg'
import outcome from '../../assets/outcome.svg'
import total from '../../assets/total.svg'

import api from '../../services/api'

import Header from '../../components/Header'

import formatValue from '../../utils/formatValue'
import formatDate from '../../utils/formatDate'

import { Container, CardContainer, Card, TableContainer } from './styles'

interface Transaction {
	id: string
	title: string
	value: number
	formattedValue: string
	formattedDate: string
	type: 'income' | 'outcome'
	category: { title: string }
	created_at: string
}

interface Balance {
	income: number
	outcome: number
	total: number
}

interface DefaultProps {
	children?: React.ReactNode
	location: {
		pathname: string
	}
}

const Dashboard: React.FC<DefaultProps> = (props: DefaultProps) => {
	const [transactions, setTransactions] = useState<Transaction[]>([])
	const [balance, setBalance] = useState<Balance>({} as Balance)

	useEffect(() => {
		async function loadTransactions(): Promise<void> {
			try {
				const { data } = await api.get('transactions')

				setBalance(data.balance)

				const transactionsFormatted = data.transactions.map(
					(transaction: Transaction) => {
						const { value, created_at, type } = transaction

						const signal = type === 'outcome' ? '- ' : ''

						const formattedDate = parseISO(created_at)

						console.log('formatted date', formattedDate)
						console.log('createdAt')

						transaction.formattedValue = signal + formatValue(value)
						transaction.formattedDate = formatDate(formattedDate)

						return transaction
					}
				)

				setTransactions(transactionsFormatted)
			} catch (err) {
				console.log(err)
			}
		}

		loadTransactions()
	}, [])

	return (
		<>
			<Header currentPath={props.location.pathname} />
			<Container>
				<CardContainer>
					<Card>
						<header>
							<p>Entradas</p>
							<img src={income} alt="Income" />
						</header>
						<h1 data-testid="balance-income">
							{balance.income ? formatValue(balance.income) : '-'}
						</h1>
					</Card>
					<Card>
						<header>
							<p>Saídas</p>
							<img src={outcome} alt="Outcome" />
						</header>
						<h1 data-testid="balance-outcome">
							{balance.outcome
								? formatValue(balance.outcome)
								: '-'}
						</h1>
					</Card>
					<Card total>
						<header>
							<p>Total</p>
							<img src={total} alt="Total" />
						</header>
						<h1 data-testid="balance-total">
							{formatValue(balance.total)}
						</h1>
					</Card>
				</CardContainer>

				<TableContainer>
					<table>
						<thead>
							<tr>
								<th>Título</th>
								<th>Preço</th>
								<th>Categoria</th>
								<th>Data</th>
							</tr>
						</thead>

						<tbody>
							{transactions.map(transaction => (
								<tr key={transaction.id}>
									<td className="title">
										{transaction.title}
									</td>
									<td className={transaction.type}>
										{transaction.formattedValue}
									</td>
									<td>{transaction.category.title}</td>
									<td>{transaction.formattedDate}</td>
								</tr>
							))}
						</tbody>
					</table>
				</TableContainer>
			</Container>
		</>
	)
}

export default Dashboard
