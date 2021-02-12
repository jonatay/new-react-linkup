import FuseDialog from '@fuse/core/FuseDialog';
import FuseMessage from '@fuse/core/FuseMessage';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FuseSuspense from '@fuse/core/FuseSuspense';
import { makeStyles } from '@material-ui/core/styles';
import AppContext from 'app/AppContext';
// import SettingsPanel from 'app/fuse-layouts/shared-components/SettingsPanel';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import FooterLayoutLinkup from './components/FooterLayoutLinkup';
import LeftSideLayoutLinkup from './components/LeftSideLayoutLinkup';
import NavbarWrapperLayoutLinkup from './components/NavbarWrapperLayoutLinkup';
import RightSideLayoutLinkup from './components/RightSideLayoutLinkup';
import ToolbarLayoutLinkup from './components/ToolbarLayoutLinkup';

const useStyles = makeStyles(theme => ({
	root: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.default,
		color: theme.palette.text.primary,
		'&.boxed': {
			maxWidth: 1280,
			margin: '0 auto',
			boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
		},
		'&.scroll-body': {
			'& $wrapper': {
				height: 'auto',
				flex: '0 0 auto',
				overflow: 'auto'
			},
			'& $contentWrapper': {},
			'& $content': {}
		},
		'&.scroll-content': {
			'& $wrapper': {},
			'& $contentWrapper': {},
			'& $content': {}
		},
		'& .navigation': {
			'& .list-subheader-text, & .list-item-text, & .item-badge, & .arrow-icon': {
				transition: theme.transitions.create('opacity', {
					duration: theme.transitions.duration.shortest,
					easing: theme.transitions.easing.easeInOut
				})
			}
		}
	},
	wrapper: {
		display: 'flex',
		position: 'relative',
		width: '100%',
		height: '100%',
		flex: '1 1 auto'
	},
	contentWrapper: {
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
		zIndex: 3,
		overflow: 'hidden',
		flex: '1 1 auto'
	},
	content: {
		position: 'relative',
		display: 'flex',
		overflow: 'auto',
		flex: '1 1 auto',
		flexDirection: 'column',
		width: '100%',
		'-webkit-overflow-scrolling': 'touch',
		zIndex: 2
	}
}));

function LayoutLinkup(props) {
	const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);

	const appContext = useContext(AppContext);
	const classes = useStyles(props);
	const { routes } = appContext;

	// console.warn('FuseLayout:: rendered');

	switch (config.scroll) {
		case 'body': {
			return (
				<div id="fuse-layout" className={clsx(classes.root, config.mode, `scroll-${config.scroll}`)}>
					{config.leftSidePanel.display && <LeftSideLayoutLinkup />}

					<div className="flex flex-1 flex-col overflow-hidden relative">
						{config.toolbar.display &&
							config.toolbar.style === 'fixed' &&
							config.toolbar.position === 'above' && <ToolbarLayoutLinkup />}

						<FuseScrollbars className="overflow-auto" scrollToTopOnRouteChange>
							{config.toolbar.display &&
								config.toolbar.style !== 'fixed' &&
								config.toolbar.position === 'above' && <ToolbarLayoutLinkup />}

							<div className={classes.wrapper}>
								{config.navbar.display && config.navbar.position === 'left' && (
									<NavbarWrapperLayoutLinkup />
								)}

								<div className={classes.contentWrapper}>
									{config.toolbar.display && config.toolbar.position === 'below' && (
										<ToolbarLayoutLinkup />
									)}

									<div className={classes.content}>
										<FuseDialog />

										<FuseSuspense>{renderRoutes(routes)}</FuseSuspense>

										{props.children}
									</div>

									{config.footer.display && config.footer.position === 'below' && (
										<FooterLayoutLinkup />
									)}

									{/* <SettingsPanel /> */}
								</div>

								{config.navbar.display && config.navbar.position === 'right' && (
									<NavbarWrapperLayoutLinkup />
								)}
							</div>

							{config.footer.display &&
								config.footer.style !== 'fixed' &&
								config.footer.position === 'above' && <FooterLayoutLinkup />}
						</FuseScrollbars>

						{config.footer.display &&
							config.footer.style === 'fixed' &&
							config.footer.position === 'above' && <FooterLayoutLinkup />}
					</div>

					{config.rightSidePanel.display && <RightSideLayoutLinkup />}

					<FuseMessage />
				</div>
			);
		}
		case 'content':
		default: {
			return (
				<div id="fuse-layout" className={clsx(classes.root, config.mode, `scroll-${config.scroll}`)}>
					{config.leftSidePanel.display && <LeftSideLayoutLinkup />}

					<div className="flex flex-1 flex-col overflow-hidden relative">
						{config.toolbar.display && config.toolbar.position === 'above' && <ToolbarLayoutLinkup />}

						<div className={classes.wrapper}>
							{config.navbar.display && config.navbar.position === 'left' && (
								<NavbarWrapperLayoutLinkup />
							)}

							<div className={classes.contentWrapper}>
								{config.toolbar.display &&
									config.toolbar.position === 'below' &&
									config.toolbar.style === 'fixed' && <ToolbarLayoutLinkup />}

								<FuseScrollbars className={classes.content} scrollToTopOnRouteChange>
									{config.toolbar.display &&
										config.toolbar.position === 'below' &&
										config.toolbar.style !== 'fixed' && <ToolbarLayoutLinkup />}

									<FuseDialog />

									<FuseSuspense>{renderRoutes(routes)}</FuseSuspense>

									{props.children}

									{config.footer.display &&
										config.footer.position === 'below' &&
										config.footer.style !== 'fixed' && <FooterLayoutLinkup />}
								</FuseScrollbars>

								{config.footer.display &&
									config.footer.position === 'below' &&
									config.footer.style === 'fixed' && <FooterLayoutLinkup />}

								{/* <SettingsPanel /> */}
							</div>

							{config.navbar.display && config.navbar.position === 'right' && (
								<NavbarWrapperLayoutLinkup />
							)}
						</div>

						{config.footer.display && config.footer.position === 'above' && <FooterLayoutLinkup />}
					</div>

					{config.rightSidePanel.display && <RightSideLayoutLinkup />}

					<FuseMessage />
				</div>
			);
		}
	}
}

export default React.memo(LayoutLinkup);
