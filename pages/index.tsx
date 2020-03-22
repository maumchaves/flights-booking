import { withApollo } from "../components/withApollo";
import BookingPage from "../components/BookingPage";

const Home: React.FC = () => <BookingPage />;

export default withApollo(Home);
