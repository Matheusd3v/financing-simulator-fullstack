#!/bin/bash

# Install kubectl if not present
if ! command -v kubectl &> /dev/null; then
    echo "Installing kubectl..."
    curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
    chmod +x kubectl
    sudo mv kubectl /usr/local/bin/
    echo "✅ kubectl installed"
fi


BASE_PATH="$(dirname "$0")"

# Backend .env and secret creation (now going up one level to reach backend)
ENV_PATH="$BASE_PATH/../backend/.env"
TEMP_ENV_PATH="$BASE_PATH/tmp-env-stripped"

echo "Creating .env file from environment variables..."
cat << EOF > "$ENV_PATH"
# API
PORT=${PORT}

# JWT
JWT_SECRET=${JWT_SECRET}
JWT_EXPIRATION=${JWT_EXPIRATION}

# DATABASE
DATABASE_URL=${DATABASE_URL}
EOF

echo "✅ .env file created at: $ENV_PATH"

# Validate required environment variables
if [ -z "$JWT_SECRET" ] || [ -z "$DATABASE_URL" ]; then
  echo "❌ Missing required environment variables (JWT_SECRET or DATABASE_URL)"
  rm "$ENV_PATH"  # Clean up on error
  exit 1
fi

# Remove quotes from values and create temp file
sed -E 's/^(.*)=["'"'"'](.*)["'"'"']$/\1=\2/' "$ENV_PATH" > "$TEMP_ENV_PATH"

SECRET_PATH="$BASE_PATH/secret.yml"

kubectl create secret generic simulador-fin-env-secret \
  --from-env-file="$TEMP_ENV_PATH" \
  --dry-run=client -o yaml > "$SECRET_PATH"

kubectl apply -f "$SECRET_PATH" -n simulador-fin
rm "$TEMP_ENV_PATH"
rm "$ENV_PATH"  # Delete .env file after use
echo "✅ API Secrets created"

kubectl apply -f "$BASE_PATH/cert-manager-issuer.yaml"
echo "✅ Cert-manager issuer applied"

kubectl apply -f "$BASE_PATH/backend/deployment.yml"
kubectl apply -f "$BASE_PATH/backend/api-service.yml"
echo "✅ Backend deployment and service applied"
