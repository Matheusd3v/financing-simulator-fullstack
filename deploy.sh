#!/bin/bash

BASE_PATH="$(dirname "$0")"

# Backend .env and secret creation
ENV_PATH="$BASE_PATH/backend/.env"
TEMP_ENV_PATH="$BASE_PATH/tmp-env-stripped"

if [ ! -f "$ENV_PATH" ]; then
  echo "❌ .env file not found at: $ENV_PATH"
  exit 1
fi

# Remove quotes from env values
sed -E 's/^(.*)=["'"'"'](.*)["'"'"']$/\1=\2/' "$ENV_PATH" > "$TEMP_ENV_PATH"

SECRET_PATH="$BASE_PATH/k8s/secret.yml"

kubectl create secret generic simulador-fin-env-secret \
  --from-env-file="$TEMP_ENV_PATH" \
  --dry-run=client -o yaml > "$SECRET_PATH"

sleep 2
kubectl apply -f "$SECRET_PATH" -n simulador-fin
rm "$TEMP_ENV_PATH"

sleep 1
echo "✅ API Secrets created"


echo "Aplicando cert-manager-issuer.yaml..."
kubectl apply -f "$BASE_PATH/k8s/cert-manager-issuer.yaml"
sleep 2


echo "Aplicando backend deployment.yml..."
kubectl apply -f "$BASE_PATH/k8s/backend/deployment.yml"
sleep 5

echo "Aplicando backend api-service.yml..."
kubectl apply -f "$BASE_PATH/k8s/backend/api-service.yml"
sleep 2


echo "Aplicando frontend deployment.yml..."
kubectl apply -f "$BASE_PATH/k8s/frontend/deployment.yml"
sleep 5

echo "Aplicando frontend service.yml..."
kubectl apply -f "$BASE_PATH/k8s/frontend/service.yml"
sleep 2


echo "Aplicando ingress.yml..."
kubectl apply -f "$BASE_PATH/k8s/ingress.yml"
sleep 2

echo "✅ Backend and frontend manifests applied successfully!"
