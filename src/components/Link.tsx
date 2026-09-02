import * as React from 'react';
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { Link as GatsbyLink } from 'gatsby';

const Link = React.forwardRef<HTMLAnchorElement, MuiLinkProps>(
    function Link(props, ref) {
        return <MuiLink component={GatsbyLink} ref={ref} {...props} />;
    }
);

export default Link;