import { Box } from '@mui/material';
import { styled, Theme } from '@mui/system';

interface IWidgetWrapperProps {
    theme: Theme;
}

const WidgetWrapper = styled(Box)<IWidgetWrapperProps>(({ theme }) => ({
    padding: '1.5rem 1.5rem 0.75rem 1.5rem',
    margin: '1.5rem 1.5rem 0.75rem 1.5rem',
    backgroundColor: theme.palette.background.alt,
    borderRadius: "0.75rem",
}));

export default WidgetWrapper;