import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Menu
export interface Menu {
	path?: string;
	title?: string;
	type?: string;
	megaMenu?: boolean;
	image?: string;
	active?: boolean;
	badge?: boolean;
	badgeText?: string;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	constructor() { }

	public screenWidth: any;
	public leftMenuToggle: boolean = false;
	public mainMenuToggle: boolean = false;

	// Windows width
	@HostListener('window:resize', ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	MENUITEMS: Menu[] = [
		{
			title: 'Inicio', type: 'sub', active: false, children: [
				{
					title: 'ropa', type: 'sub', active: false, children: [
						{ path: '/home/fashion', title: 'moda', type: 'link' },
						{ path: '/home/fashion-2', title: 'fashion-02', type: 'link' },
						{ path: '/home/fashion-3', title: 'fashion-03', type: 'link' }
					]
				},
				{ path: '/home/vegetable', title: 'Vejetales', type: 'link' },
				{ path: '/home/watch', title: 'reloj', type: 'link' },
				{ path: '/home/furniture', title: 'mueble', type: 'link' },
				{ path: '/home/flower', title: 'flores', type: 'link' },
				{ path: '/home/beauty', title: 'belleza', type: 'link' },
				{ path: '/home/electronics', title: 'electrónica', type: 'link' },
				{ path: '/home/pets', title: 'mascotas', type: 'link' },
				{ path: '/home/gym', title: 'gimnasio', type: 'link' },
				{ path: '/home/tools', title: 'heramientas', type: 'link' },
				{ path: '/home/shoes', title: 'zapatos', type: 'link' },
				{ path: '/home/bags', title: 'pantalones', type: 'link' },
				{ path: '/home/marijuana', title: 'marijuana', type: 'link' }
			]
		},
	/*	{
			title: 'Tienda', type: 'sub', active: false, children: [
				{ path: '/shop/collection/left/sidebar', title: 'left-sidebar', type: 'link' },
				{ path: '/shop/collection/right/sidebar', title: 'right-sidebar', type: 'link' },
				{ path: '/shop/collection/no/sidebar', title: 'no-sidebar', type: 'link' }
			]
		},*/
	/*	{
			title: 'Productos', type: 'sub', active: false, children: [
				{
					title: 'Menu lateral', type: 'sub', active: false, children: [
						{ path: '/shop/product/left/sidebar/trim-dress', title: 'Producto', type: 'link' },
						{ path: '/shop/product/right/sidebar/trim-dress', title: 'right-sidebar', type: 'link' },
						{ path: '/shop/product/no/sidebar/trim-dress', title: 'no-sidebar', type: 'link' }
					]
				},
				{ path: '/shop/product/three/column/trim-dress', title: 'three-column', type: 'link' },
				{ path: '/shop/product/four/image/belted-dress', title: 'four-image', type: 'link' },
				{ path: '/shop/product/bundle/trim-dress', title: 'bundle-product', type: 'link' },
				{ path: '/shop/product/image/outside/trim-dress', title: 'image-outside', type: 'link' }
			]
		},*/
		/*{
			title: 'Propiedades', type: 'sub', megaMenu: true, badge: true, badgeText: 'new', active: false, children: [
				{
					title: 'portfolio', type: 'sub', active: false, children: [
						{ path: '/pages/portfolio/grid/two', title: 'portfolio-grid-2', type: 'link' },
						{ path: '/pages/portfolio/grid/three', title: 'portfolio-grid-3', type: 'link' },
						{ path: '/pages/portfolio/grid/four', title: 'portfolio-grid-4', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/two', title: 'mesonary-grid-2', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/three', title: 'mesonary-grid-3', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/four', title: 'mesonary-grid-4', type: 'link' },
						{ path: '/pages/portfolio/masonry/full-width', title: 'mesonary-Full-Width', type: 'link' }
					]
				},
				{
					title: 'Añadir al carrito', type: 'sub', active: false, children: [
						{ path: '/home/vegetable', title: 'carro derecho', type: 'link' },
						{ path: '/home/watch', title: 'carro a la izquierda', type: 'link' },
						{ path: '/home/furniture', title: 'carro superior', type: 'link' },
						{ path: '/home/flower', title: 'cart-bottom', type: 'link' },
						{ path: '/home/fashion', title: 'cart-model-popup', type: 'link' }
					]
				},
				{
					title: 'theme-elements', type: 'sub', active: false, children: [
						{ path: '/elements/theme/title', title: 'title', type: 'link' },
						{ path: '/elements/theme/collection-banner', title: 'collection-banner', type: 'link' },
						{ path: '/elements/theme/home-slider', title: 'home-slider', type: 'link' },
						{ path: '/elements/theme/category', title: 'category', type: 'link' },
						{ path: '/elements/theme/services', title: 'services', type: 'link' }
					]
				},
				{
					title: 'elementos de producto', type: 'sub', active: false, children: [
						{ path: '/elements/product/slider', title: 'product-slider', type: 'link' },
						{ path: '/elements/product/banners', title: 'banners', type: 'link' },
						{ path: '/elements/product/tabs', title: 'product-tabs', type: 'link' },
						{ path: '/elements/product/multi-slider', title: 'multi-slider', type: 'link' }
					]
				},
				{
					title: 'email-template', type: 'sub', active: false, children: [{}
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-order-success.html', title: 'order-success', type: 'extTabLink' },
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-order-success-two.html', title: 'order-success-2', type: 'extTabLink' },
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-template.html', title: 'email-template', type: 'extTabLink' },
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-template-two.html', title: 'email-template-2', type: 'extTabLink' }
					]
				}
			]
		},*/
		{
			title: 'Cuenta', type: 'sub', active: false, children: [
				/*{
					title: 'cuenta', type: 'sub', active: false, children: [
						{ path: '/pages/wishlist', title: 'lista de deseos', type: 'link' },
						{ path: '/pages/cart', title: 'cart', type: 'link' },
						{ path: '/pages/dashboard', title: 'dashboard', type: 'link' },
						{ path: '/pages/login', title: 'ingreso', type: 'link' },
						{ path: '/pages/register', title: 'registrarse', type: 'link' },
						{ path: '/pages/contact', title: 'contacto', type: 'link' },
						{ path: '/pages/forget/password', title: 'olvido la contraseña', type: 'link' },
						{ path: '/pages/profile', title: 'perfil', type: 'link' },
						{ path: '/pages/checkout', title: 'revisar', type: 'link' },
					]
				},*/
				{ path: '/pages/aboutus', title: 'sobre nosotros', type: 'link' },
				/*{ path: '/pages/search', title: 'buscar', type: 'link' },
				/*{ path: '/pages/typography', title: 'tipografía', type: 'link', badge: true, badgeText: 'new' },
				{ path: '/pages/review', title: 'revisar', type: 'link', badge: true, badgeText: 'new' },
				{ path: '/pages/order/success', title: 'orden  éxitosas', type: 'link' },
					/*{ 
						title: 'comparar', type: 'sub', active: false, children: [
							{ path: '/pages/compare/one', title: 'compare-1', type: 'link' },
							{ path: '/pages/compare/two', title: 'compare-2', type: 'link', badge: true, badgeText: 'new' }
						]
					},*/
			/*	{ path: '/pages/collection', title: 'colección', type: 'link' },
				{ path: '/pages/lookbook', title: 'lookbook', type: 'link' },
				{ path: '/pages/404', title: '404', type: 'link' },
				{ path: '/pages/comingsoon', title: 'próximamente', type: 'link', badge: true, badgeText: 'new' },
				{ path: '/pages/faq', title: 'preguntas', type: 'link' }*/
			]
		},
		
	/*	{
			title: 'blogs', type: 'sub', active: false, children: [
				{ path: '/pages/blog/left/sidebar', title: 'left-sidebar', type: 'link' },
				{ path: '/pages/blog/right/sidebar', title: 'right-sidebar', type: 'link' },
				{ path: '/pages/blog/no/sidebar', title: 'no-sidebar', type: 'link' },
				{ path: '/pages/blog/details', title: 'blog-details', type: 'link' }
			]
		}*/
	];

	LEFTMENUITEMS: Menu[] = [
		{
			title: 'ropa', type: 'sub', megaMenu: true, active: false, children: [
			  {
				  title: 'moda hombres',  type: 'link', active: false, children: [
					  { path: '/home/fashion', title: 'ropa deportiva',  type: 'link' },
					  { path: '/home/fashion', title: 'top',  type: 'link' },
					  { path: '/home/fashion', title: 'bottom',  type: 'link' },
					  { path: '/home/fashion', title: 'ethic wear',  type: 'link' },
					  { path: '/home/fashion', title: 'sports wear',  type: 'link' },
					  { path: '/home/fashion', title: 'camisas',  type: 'link' },
					  { path: '/home/fashion', title: 'bottom',  type: 'link' },
					  { path: '/home/fashion', title: 'ethic wear',  type: 'link' },
					  { path: '/home/fashion', title: 'sports wear',  type: 'link' }
				  ]
			  },
			  {
				  title: 'moda mujeres',  type: 'link', active: false, children: [
					  { path: '/home/fashion', title: 'vestidos',  type: 'link' },
					  { path: '/home/fashion', title: 'faldas',  type: 'link' },
					  { path: '/home/fashion', title: 'ropa occidental',  type: 'link' },
					  { path: '/home/fashion', title: 'ethic wear',  type: 'link' },
					  { path: '/home/fashion', title: 'bottom',  type: 'link' },
					  { path: '/home/fashion', title: 'ethic wear',  type: 'link' },
					  { path: '/home/fashion', title: 'sports wear',  type: 'link' },
					  { path: '/home/fashion', title: 'ropa deportiva',  type: 'link' },
					  { path: '/home/fashion', title: 'bottom wear',  type: 'link' }
				  ]
			  },
			]
		},
		{
			title: 'pantalones', type: 'sub', active: false, children: [
			  { path: '/home/fashion', title: 'bolsas de compras', type: 'link' },
			  { path: '/home/fashion', title: 'bolsas para laptop', type: 'link' },
			  { path: '/home/fashion', title: 'clutches', type: 'link' },
			  {
				  path: '/home/fashion', title: 'monederos', type: 'link', active: false, children: [
					  { path: '/home/fashion', title: 'purses',  type: 'link' },
					  { path: '/home/fashion', title: 'billeteras',  type: 'link' },
					  { path: '/home/fashion', title: 'cueros',  type: 'link' },
					  { path: '/home/fashion', title: 'mochilas',  type: 'link' }
				  ]
			  },
			]
		},
		{
			title: 'calzado', type: 'sub', active: false, children: [
			  { path: '/home/fashion', title: 'deporte', type: 'link' },
			  { path: '/home/fashion', title: 'formal', type: 'link' },
			  { path: '/home/fashion', title: 'casual', type: 'link' }
			]
		},
		{
			path: '/home/fashion', title: 'relojes', type: 'link'
		},
		{
			title: 'Accessorios', type: 'sub', active: false, children: [
			  { path: '/home/fashion', title: 'joyería de moda', type: 'link' },
			  { path: '/home/fashion', title: 'gorras y sombreros', type: 'link' },
			  { path: '/home/fashion', title: 'joyas preciosas', type: 'link' },
			  {
				  path: '/home/fashion', title: 'mas..', type: 'link', active: false, children: [
					  { path: '/home/fashion', title: 'collares',  type: 'link' },
					  { path: '/home/fashion', title: 'aritos',  type: 'link' },
					  { path: '/home/fashion', title: 'anillos y muñequeras',  type: 'link' },
					  {
						  path: '/home/fashion', title: 'mas',  type: 'link', active: false, children: [
							  { path: '/home/fashion', title: 'corbatas',  type: 'link' },
							  { path: '/home/fashion', title: 'mancuernas',  type: 'link' },
							  { path: '/home/fashion', title: 'trajes',  type: 'link' },
							  { path: '/home/fashion', title: 'cascos',  type: 'link' },
							  { path: '/home/fashion', title: 'bufandas',  type: 'link' },
							  {
								  path: '/home/fashion', title: 'mas...',  type: 'link', active: false, children: [
									  { path: '/home/fashion', title: 'juegos de accesorios',  type: 'link' },
									  { path: '/home/fashion', title: 'accesorios de viaje',  type: 'link' },
									  { path: '/home/fashion', title: 'cajas del teléfono',  type: 'link' }
								  ]
							  },
						]
					  }
				  ]
			  },
			]
		},
		{
			path: '/home/fashion', title: 'casa de diseño', type: 'link'
		},
		{
			title: 'belleza y cuidado Personal', type: 'sub', active: false, children: [
			  { path: '/home/fashion', title: 'maquillaje', type: 'link' },
			  { path: '/home/fashion', title: 'protección de la piel', type: 'link' },
			  { path: '/home/fashion', title: 'premium beaty', type: 'link' },
			  {
				  path: '/home/fashion', title: 'mas..', type: 'link', active: false, children: [
					  { path: '/home/fashion', title: 'fragancias',  type: 'link' },
					  { path: '/home/fashion', title: 'belleza de lujo',  type: 'link' },
					  { path: '/home/fashion', title: 'cuidado del cabello',  type: 'link' },
					  { path: '/home/fashion', title: 'tools & brushes',  type: 'link' }
				  ]
			  },
			]
		},
		{
			path: '/home/fashion', title: 'decoración del hogar', type: 'link'
		},
		{
			path: '/home/fashion', title: 'cocina', type: 'link'
		},
	];






	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
	leftMenuItems = new BehaviorSubject<Menu[]>(this.LEFTMENUITEMS);




}
