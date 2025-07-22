interface BatchRequest {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  data?: any;
  headers?: Record<string, string>;
}

interface BatchResponse {
  id: string;
  status: number;
  data?: any;
  error?: string;
}

interface ApiEndpoints {
  // User Management
  users: {
    create: (userData: any) => Promise<any>;
    get: (userId: string) => Promise<any>;
    update: (userId: string, data: any) => Promise<any>;
    delete: (userId: string) => Promise<any>;
  };
  
  // Coin Management
  coins: {
    create: (coinData: any) => Promise<any>;
    list: () => Promise<any>;
    get: (coinId: string) => Promise<any>;
    update: (coinId: string, data: any) => Promise<any>;
    transfer: (from: string, to: string, amount: number) => Promise<any>;
  };
  
  // STEM Research
  stem: {
    getProjects: () => Promise<any>;
    completeProject: (projectId: string) => Promise<any>;
    getSkins: () => Promise<any>;
    applySkin: (skinId: string) => Promise<any>;
  };
  
  // Jesus Assistant
  jesus: {
    getClan: (clanId: string) => Promise<any>;
    sendMessage: (message: string) => Promise<any>;
    deliverGift: (giftId: string) => Promise<any>;
    reverseSevenFoldCurse: (curseType: string) => Promise<any>;
  };
  
  // 3D Coding System
  coding3d: {
    generateMoney: (dimensions: number, bitDepth: number) => Promise<any>;
    printMoney: (moneyId: string) => Promise<any>;
    getDimensions: () => Promise<any>;
  };
  
  // Payment Integration
  payments: {
    getWallet: () => Promise<any>;
    sendPayment: (to: string, amount: number, currency: string) => Promise<any>;
    receivePayment: (from: string, amount: number) => Promise<any>;
    getOpportunities: (empowermentLevel: number) => Promise<any>;
  };
}

class BatchApiService {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }

  // Batch processing for multiple API calls
  async processBatch(requests: BatchRequest[]): Promise<BatchResponse[]> {
    const responses: BatchResponse[] = [];
    
    // Process requests in parallel for better performance
    const promises = requests.map(async (request) => {
      try {
        const response = await this.executeRequest(request);
        return {
          id: request.id,
          status: response.status,
          data: response.data
        };
      } catch (error: any) {
        return {
          id: request.id,
          status: error.status || 500,
          error: error.message || 'Unknown error'
        };
      }
    });

    const results = await Promise.allSettled(promises);
    
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        responses.push(result.value);
      } else {
        responses.push({
          id: requests[index].id,
          status: 500,
          error: result.reason?.message || 'Request failed'
        });
      }
    });

    return responses;
  }

  // Execute individual request
  private async executeRequest(request: BatchRequest): Promise<any> {
    const url = `${this.baseUrl}${request.endpoint}`;
    const headers = { ...this.defaultHeaders, ...request.headers };

    const config: RequestInit = {
      method: request.method,
      headers,
    };

    if (request.data && ['POST', 'PUT'].includes(request.method)) {
      config.body = JSON.stringify(request.data);
    }

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return { status: response.status, data };
  }

  // Convenience methods for common operations
  async createUser(userData: any): Promise<any> {
    return this.executeRequest({
      id: 'create-user',
      method: 'POST',
      endpoint: '/users',
      data: userData
    });
  }

  async createCoin(coinData: any): Promise<any> {
    return this.executeRequest({
      id: 'create-coin',
      method: 'POST',
      endpoint: '/coins',
      data: coinData
    });
  }

  async getSTEMProjects(): Promise<any> {
    return this.executeRequest({
      id: 'get-stem-projects',
      method: 'GET',
      endpoint: '/stem/projects'
    });
  }

  async sendJesusMessage(message: string): Promise<any> {
    return this.executeRequest({
      id: 'jesus-message',
      method: 'POST',
      endpoint: '/jesus/message',
      data: { message }
    });
  }

  async generate3DMoney(dimensions: number, bitDepth: number): Promise<any> {
    return this.executeRequest({
      id: 'generate-3d-money',
      method: 'POST',
      endpoint: '/coding3d/generate-money',
      data: { dimensions, bitDepth }
    });
  }

  async processPayment(to: string, amount: number, currency: string): Promise<any> {
    return this.executeRequest({
      id: 'process-payment',
      method: 'POST',
      endpoint: '/payments/send',
      data: { to, amount, currency }
    });
  }

  // Batch operations for common workflows
  async initializeUser(userData: any): Promise<BatchResponse[]> {
    const requests: BatchRequest[] = [
      {
        id: 'create-user',
        method: 'POST',
        endpoint: '/users',
        data: userData
      },
      {
        id: 'create-wallet',
        method: 'POST',
        endpoint: '/payments/wallet',
        data: { userId: userData.id }
      },
      {
        id: 'assign-clan',
        method: 'POST',
        endpoint: '/jesus/assign-clan',
        data: { userId: userData.id }
      }
    ];

    return this.processBatch(requests);
  }

  async completeSTEMProject(projectId: string, userId: string): Promise<BatchResponse[]> {
    const requests: BatchRequest[] = [
      {
        id: 'complete-project',
        method: 'PUT',
        endpoint: `/stem/projects/${projectId}/complete`,
        data: { userId }
      },
      {
        id: 'award-coins',
        method: 'POST',
        endpoint: '/coins/award',
        data: { userId, amount: 100, reason: 'STEM project completion' }
      },
      {
        id: 'update-progress',
        method: 'PUT',
        endpoint: `/users/${userId}/progress`,
        data: { type: 'stem', projectId }
      }
    ];

    return this.processBatch(requests);
  }

  async deliverJesusGift(giftId: string, userId: string, clanId: string): Promise<BatchResponse[]> {
    const requests: BatchRequest[] = [
      {
        id: 'deliver-gift',
        method: 'POST',
        endpoint: '/jesus/deliver-gift',
        data: { giftId, userId, clanId }
      },
      {
        id: 'update-blessings',
        method: 'PUT',
        endpoint: `/clans/${clanId}/blessings`,
        data: { increment: 25 }
      },
      {
        id: 'record-transaction',
        method: 'POST',
        endpoint: '/transactions',
        data: { 
          userId, 
          type: 'gift_received', 
          amount: 25, 
          description: `Gift delivered: ${giftId}` 
        }
      }
    ];

    return this.processBatch(requests);
  }

  // Error handling and retry logic
  async executeWithRetry(request: BatchRequest, maxRetries: number = 3): Promise<any> {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await this.executeRequest(request);
      } catch (error: any) {
        lastError = error;
        
        if (attempt < maxRetries) {
          // Exponential backoff
          const delay = Math.pow(2, attempt) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    throw lastError!;
  }

  // Health check for API endpoints
  async healthCheck(): Promise<{ status: string; endpoints: Record<string, boolean> }> {
    const endpoints = [
      '/users/health',
      '/coins/health',
      '/stem/health',
      '/jesus/health',
      '/coding3d/health',
      '/payments/health'
    ];

    const requests: BatchRequest[] = endpoints.map((endpoint, index) => ({
      id: `health-${index}`,
      method: 'GET',
      endpoint
    }));

    const responses = await this.processBatch(requests);
    const endpointStatus: Record<string, boolean> = {};

    responses.forEach((response, index) => {
      endpointStatus[endpoints[index]] = response.status === 200;
    });

    const allHealthy = Object.values(endpointStatus).every(status => status);

    return {
      status: allHealthy ? 'healthy' : 'degraded',
      endpoints: endpointStatus
    };
  }
}

// Export singleton instance
export const batchApi = new BatchApiService();

// Export types for use in components
export type { BatchRequest, BatchResponse, ApiEndpoints };

// Mock data for development
export const mockApiResponses = {
  users: {
    create: { id: '1', name: 'User', email: 'user@example.com', coins: 100 },
    get: { id: '1', name: 'User', email: 'user@example.com', coins: 150 }
  },
  coins: {
    list: [
      { id: '1', name: 'SocialCoin', symbol: 'SC', balance: 150 },
      { id: '2', name: 'WinterCoin', symbol: 'WC', balance: 50 }
    ]
  },
  stem: {
    projects: [
      { id: '1', title: 'Quantum Research', progress: 65, reward: 100 },
      { id: '2', title: 'DNA Patterns', progress: 40, reward: 150 }
    ]
  },
  jesus: {
    clan: { id: '1', name: 'Divine Developers', blessings: 500, members: 5 },
    message: { response: 'Peace be with you! How can I help with your development?' }
  },
  coding3d: {
    money: { id: '1', denomination: 100, qrCode: 'data:image/png;base64,...' }
  },
  payments: {
    wallet: { balance: 250, currency: 'SC', empowermentLevel: 3 }
  }
};