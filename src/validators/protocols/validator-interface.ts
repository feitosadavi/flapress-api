export type Fields = {
	notFoundFields: string[]
}

export interface ValidatorInterface {
	validate (message: string): Fields
}
