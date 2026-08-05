import { config } from './config';

/**
 * Thin typed client over the EShop backend (see sut-requirements.md §5).
 *
 * Setup / teardown / expected-value computation ONLY. The feature behaviour
 * under test is always exercised through the web UI — HW04 §6 automates the
 * web frontend, not the API.
 */

export interface AuthUser {
  email: string;
  password: string;
  token: string;
  id?: number;
}

export interface OrderSummary {
  id: number;
  status: string;
  total_amount: number;
  [key: string]: unknown;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  [key: string]: unknown;
}

async function request<T>(
  method: string,
  route: string,
  options: { token?: string; body?: unknown } = {},
): Promise<T> {
  const response = await fetch(`${config.apiUrl}${route}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    ...(options.body === undefined ? {} : { body: JSON.stringify(options.body) }),
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(
      `${method} ${route} -> ${response.status} ${response.statusText}: ${text}`,
    );
  }
  return (text ? JSON.parse(text) : undefined) as T;
}

/** Unique throwaway identity so a lockout test can never poison a shared account. */
export function uniqueEmail(prefix = 'hw04'): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}@eshop.test`;
}

export async function register(
  email: string,
  password: string,
  name = 'HW04 Automation',
): Promise<void> {
  await request('POST', '/api/register', { body: { name, email, password } });
}

export async function login(email: string, password: string): Promise<AuthUser> {
  const data = await request<{ token: string; user?: { id?: number } }>(
    'POST',
    '/api/login',
    { body: { email, password } },
  );
  return { email, password, token: data.token, id: data.user?.id };
}

/** Register + log in a brand-new user in one step. */
export async function createUser(prefix?: string, password = 'Hw04Test!23'): Promise<AuthUser> {
  const email = uniqueEmail(prefix);
  await register(email, password);
  return login(email, password);
}

export async function loginAdmin(): Promise<AuthUser> {
  return login(config.accounts.admin.email, config.accounts.admin.password);
}

export async function getProducts(): Promise<Product[]> {
  return request<Product[]>('GET', '/api/products');
}

export async function addToCart(
  token: string,
  product: Pick<Product, 'id' | 'name' | 'price'>,
  quantity = 1,
): Promise<void> {
  await request('POST', '/api/cart', {
    token,
    body: { id: product.id, name: product.name, price: product.price, quantity },
  });
}

export async function checkout(
  token: string,
  totalAmount: number,
  shippingAddress = '227 Nguyen Van Cu, Q5, TP.HCM',
): Promise<unknown> {
  return request('POST', '/api/checkout', {
    token,
    body: { total_amount: totalAmount, shipping_address: shippingAddress },
  });
}

export async function getMyOrders(token: string): Promise<OrderSummary[]> {
  return request<OrderSummary[]>('GET', '/api/orders/my-orders', { token });
}

export async function getAdminOrders(token: string): Promise<OrderSummary[]> {
  return request<OrderSummary[]>('GET', '/api/admin/orders', { token });
}

export async function setOrderStatus(
  adminToken: string,
  orderId: number,
  status: string,
): Promise<unknown> {
  return request('PUT', `/api/admin/orders/${orderId}/status`, {
    token: adminToken,
    body: { status },
  });
}

/**
 * Creates one fresh order in `pending` for a fresh user, so an FR-10
 * transition case never depends on an order another test already moved.
 */
export async function createPendingOrder(prefix = 'fr10'): Promise<{
  user: AuthUser;
  orderId: number;
  totalAmount: number;
}> {
  const user = await createUser(prefix);
  const products = await getProducts();
  const product = products[0];
  if (!product) {
    throw new Error('SUT has no products — reseed with `node database.js` before running.');
  }
  await addToCart(user.token, product, 1);
  await checkout(user.token, product.price);

  const orders = await getMyOrders(user.token);
  const order = orders[0];
  if (!order) {
    throw new Error(`Checkout succeeded but ${user.email} has no order.`);
  }
  return { user, orderId: order.id, totalAmount: order.total_amount };
}

/**
 * FR-13 oracle: expected revenue is the live sum of delivered orders, not a
 * hardcoded number — every previous matrix cell changes the data.
 */
export async function expectedDashboardTotals(adminToken: string): Promise<{
  deliveredRevenue: number;
  orderCount: number;
}> {
  const orders = await getAdminOrders(adminToken);
  return {
    deliveredRevenue: orders
      .filter((o) => o.status === 'delivered')
      .reduce((sum, o) => sum + Number(o.total_amount), 0),
    orderCount: orders.length,
  };
}
