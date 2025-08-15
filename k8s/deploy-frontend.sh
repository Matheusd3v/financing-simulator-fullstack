#!/bin/bash

BASE_PATH="$(dirname "$0")"

echo "Applying frontend deployment and service..."

kubectl apply -f "$BASE_PATH/frontend/deployment-temp.yml" -n simulador-fin

kubectl apply -f "$BASE_PATH/frontend/service.yml" -n simulador-fin

kubectl rollout status deployment/frontend-deployment -n simulador-fin

rm -f "$BASE_PATH/frontend/deployment-temp.yml"

echo "✅ Frontend deployment and service applied"
