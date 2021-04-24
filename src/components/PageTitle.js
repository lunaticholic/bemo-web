import { Helmet } from "react-helmet-async"
import { PropTypes } from "prop-types";

function PageTitle({ title }) {
    return (
        <Helmet>
            {title} | Beautiful Moment
        </Helmet>
    )
}

PageTitle.propTypes = {
    title: PropTypes.string.isRequired,
}

export default PageTitle;