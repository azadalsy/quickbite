# QuickBite API Documentation

Base URL:

```text
http://localhost:5000
```

## Health

### GET `/`

Returns backend status and architecture information.

## Authentication

### POST `/register`

Registers a new user. The first registered user becomes admin automatically.

Request:

```json
{
  "name": "Admin",
  "email": "admin",
  "password": "admin"
}
```

### POST `/login`

Logs in a user and returns a token.

Request:

```json
{
  "email": "admin",
  "password": "admin"
}
```

### POST `/password-reset`

Resets password for a demo account.

Request:

```json
{
  "email": "admin",
  "newPassword": "admin"
}
```

### GET `/profile`

Protected route. Requires:

```text
Authorization: Bearer <token>
```

## Foods

### GET `/foods`

Returns menu items.

Query examples:

```text
/foods?category=Soups
/foods?search=pizza
/foods?sort=price&order=asc
/foods?page=1&limit=6
```

### POST `/foods`

Admin-only. Creates a menu item.

Headers:

```text
Authorization: Bearer <token>
```

Request:

```json
{
  "name": "Tomato Soup",
  "price": 19,
  "category": "Soups",
  "image": "https://example.com/soup.jpg"
}
```

### PUT `/foods/:id`

Admin-only. Updates a menu item.

### DELETE `/foods/:id`

Admin-only. Deletes a menu item.

## Analytics

### GET `/analytics`

Returns dashboard statistics:

```json
{
  "success": true,
  "data": {
    "totalFoods": 20,
    "totalUsers": 2,
    "averagePrice": "25.95",
    "categories": []
  }
}
```

## Third-Party API

### GET `/weather`

Uses Open-Meteo to return current Warsaw weather data.

## Real-Time Events

### GET `/events`

Server-Sent Events stream. Frontend listens for live menu updates.
