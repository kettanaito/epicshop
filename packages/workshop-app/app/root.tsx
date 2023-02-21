import type {
	LinksFunction,
	SerializeFrom,
	V2_MetaFunction,
} from '@remix-run/node'
import { json } from '@remix-run/node'
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react'
import appStylesheetUrl from './styles/app.css'
import tailwindStylesheetUrl from './styles/tailwind.css'
import { getWorkshopTitle } from './utils/apps.server'

export const links: LinksFunction = () => {
	return [
		{ rel: 'stylesheet', href: '/fonts.css' },
		{ rel: 'stylesheet', href: tailwindStylesheetUrl },
		{ rel: 'stylesheet', href: appStylesheetUrl },
	]
}

export const meta: V2_MetaFunction = ({
	data,
}: {
	data: SerializeFrom<typeof loader>
}) => {
	return [
		{ charSet: 'utf-8' },
		{ title: data.workshopTitle },
		{ name: 'viewport', content: 'width=device-width,initial-scale=1' },
	]
}

export async function loader() {
	return json({
		workshopTitle: await getWorkshopTitle(),
	})
}

export default function App() {
	return (
		<html lang="en" className="h-full">
			<head>
				<Meta />
				<Links />
			</head>
			<body className="h-full">
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}
