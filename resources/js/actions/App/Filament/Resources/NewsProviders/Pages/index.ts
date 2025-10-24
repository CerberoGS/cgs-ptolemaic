import ListNewsProviders from './ListNewsProviders'
import CreateNewsProvider from './CreateNewsProvider'
import EditNewsProvider from './EditNewsProvider'
const Pages = {
    ListNewsProviders: Object.assign(ListNewsProviders, ListNewsProviders),
CreateNewsProvider: Object.assign(CreateNewsProvider, CreateNewsProvider),
EditNewsProvider: Object.assign(EditNewsProvider, EditNewsProvider),
}

export default Pages