using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SyriaShomoos.Data;
using Volo.Abp.DependencyInjection;

namespace SyriaShomoos.EntityFrameworkCore;

public class EntityFrameworkCoreSyriaShomoosDbSchemaMigrator
    : ISyriaShomoosDbSchemaMigrator, ITransientDependency
{
    private readonly IServiceProvider _serviceProvider;

    public EntityFrameworkCoreSyriaShomoosDbSchemaMigrator(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task MigrateAsync()
    {
        /* We intentionally resolving the SyriaShomoosDbContext
         * from IServiceProvider (instead of directly injecting it)
         * to properly get the connection string of the current tenant in the
         * current scope.
         */

        await _serviceProvider
            .GetRequiredService<SyriaShomoosDbContext>()
            .Database
            .MigrateAsync();
    }
}
