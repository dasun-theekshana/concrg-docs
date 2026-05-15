---
id: angular
title: Angular Integration
sidebar_label: Angular Integration
---

# Angular Integration

ConCRG integrates with Angular apps through the `CrgModule`. Import it once at the root of your application and it handles route observation, sidecar mounting, and assist mode automatically.

> Compatible with Angular 15+ (standalone components or NgModules).

---

## Basic Setup

```ts title="src/app/app.module.ts"
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CrgModule } from '@crg/connector-angular';
import { createTrainSidecar, createAssistSidecar } from '@crg/connector-angular/v2';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CrgModule.forRoot({
      config: {
        appId: 'my-app',
        serviceUrl: 'http://localhost:3001',
      },
      mountTrainUI: createTrainSidecar,
      mountAssistUI: createAssistSidecar,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

For standalone-component apps, use `provideCrg` instead:

```ts title="src/main.ts"
import { bootstrapApplication } from '@angular/platform-browser';
import { provideCrg } from '@crg/connector-angular';
import { createTrainSidecar, createAssistSidecar } from '@crg/connector-angular/v2';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideCrg({
      config: {
        appId: 'my-app',
        serviceUrl: 'http://localhost:3001',
      },
      mountTrainUI: createTrainSidecar,
      mountAssistUI: createAssistSidecar,
    }),
  ],
});
```

`CrgModule` / `provideCrg` must be registered at the application root so the connector can observe route changes and DOM mutations across all components.

---

## CrgModule Options

| Option | Type | Required | Description |
|---|---|---|---|
| `config` | `CRGConfig` | Yes | Full configuration object |
| `mountTrainUI` | `SidecarRenderer` | No | Factory for the training sidecar |
| `mountAssistUI` | `SidecarRenderer` | No | Factory for the assist toolbar |

You can omit `mountTrainUI` to disable the training panel in production. You can omit `mountAssistUI` to disable the user-facing assist UI.

---

## Environment-Based Configuration

A common pattern is to enable training mode only in development or staging:

```ts title="src/environments/environment.ts"
export const environment = {
  production: false,
  crgServiceUrl: 'http://localhost:3001',
  crgSourcePath: '/path/to/source',
  crgDocsUrl: 'https://docs.example.com',
  crgTrainingEnabled: true,
};
```

```ts title="src/app/app.module.ts"
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    CrgModule.forRoot({
      config: {
        appId: 'my-app',
        serviceUrl: environment.crgServiceUrl,
        sourceCodePath: environment.crgSourcePath,
        docsUrl: environment.crgDocsUrl,
      },
      mountTrainUI: environment.crgTrainingEnabled ? createTrainSidecar : undefined,
      mountAssistUI: createAssistSidecar,
    }),
  ],
})
export class AppModule {}
```

Use `environment.prod.ts` to omit `mountTrainUI` for production builds.

---

## Dynamic User Context

Update `userRole` and `userId` after the user logs in by injecting `CrgService`:

```ts title="src/app/auth.service.ts"
import { Injectable } from '@angular/core';
import { CrgService } from '@crg/connector-angular';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private crg: CrgService) {}

  onLogin(user: { id: string; role: string }) {
    this.crg.updateConfig({
      userId: user.id,
      userRole: user.role,
    });
  }

  onLogout() {
    this.crg.updateConfig({ userId: undefined, userRole: undefined });
  }
}
```

`CrgService.updateConfig()` merges the patch into the existing config and re-evaluates role-based access immediately.

---

## Using with Angular Router

`CrgModule` works with the Angular Router with no special integration needed — the connector listens to `NavigationEnd` events automatically.

```ts title="src/app/app-routing.module.ts"
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'deals', component: DealsComponent },
  { path: 'deals/:id', component: DealDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

Lazy-loaded modules and route guards are observed transparently — no extra wiring required.
